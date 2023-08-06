import re
import datetime
import falcon
import ipaddress
import mimetypes
import os
import json
import types
import click
from time import sleep
from certidude.wrappers import Request, Certificate, CertificateAuthority, \
    CertificateAuthorityConfig
from certidude.auth import login_required
from OpenSSL import crypto
from pyasn1.codec.der import decoder
from datetime import datetime, date
from jinja2 import Environment, PackageLoader, Template

# TODO: Restrictive filesystem permissions result in TemplateNotFound exceptions
env = Environment(loader=PackageLoader("certidude", "templates"))

RE_HOSTNAME = "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$"


OIDS = {
    (2, 5, 4,  3) : 'CN',   # common name
    (2, 5, 4,  6) : 'C',    # country
    (2, 5, 4,  7) : 'L',    # locality
    (2, 5, 4,  8) : 'ST',   # stateOrProvince
    (2, 5, 4, 10) : 'O',    # organization
    (2, 5, 4, 11) : 'OU',   # organizationalUnit
}

def parse_dn(data):
    chunks, remainder = decoder.decode(data)
    dn = ""
    if remainder:
        raise ValueError()
    # TODO: Check for duplicate entries?
    def generate():
        for chunk in chunks:
            for chunkette in chunk:
                key, value = chunkette
                yield str(OIDS[key] + "=" + value)
    return ", ".join(generate())

def omit(**kwargs):
    return dict([(key,value) for (key, value) in kwargs.items() if value])

def event_source(func):
    def wrapped(self, req, resp, *args, **kwargs):
        if req.get_header("Accept") == "text/event-stream":
            resp.status = falcon.HTTP_SEE_OTHER
            resp.location = req.context.get("ca").push_server + "/ev/" + req.context.get("ca").uuid
            resp.body = "Redirecting to:" + resp.location
            print("Delegating EventSource handling to:", resp.location)
        return func(self, req, resp, *args, **kwargs)
    return wrapped

def authorize_admin(func):
    def wrapped(self, req, resp, *args, **kwargs):
        authority = req.context.get("ca")

        # Parse remote IPv4/IPv6 address
        remote_addr = ipaddress.ip_network(req.env["REMOTE_ADDR"])

        # Check for administration subnet whitelist
        print("Comparing:", authority.admin_subnets, "To:", remote_addr)
        for subnet in authority.admin_subnets:
            if subnet.overlaps(remote_addr):
                break
        else:
            raise falcon.HTTPForbidden("Forbidden", "Remote address %s not whitelisted" % remote_addr)

        # Check for username whitelist
        kerberos_username, kerberos_realm = req.context.get("user")
        if kerberos_username not in authority.admin_users:
            raise falcon.HTTPForbidden("Forbidden", "User %s not whitelisted" % kerberos_username)

        # Retain username, TODO: Better abstraction with username, e-mail, sn, gn?

        return func(self, req, resp, *args, **kwargs)
    return wrapped


def pop_certificate_authority(func):
    def wrapped(self, req, resp, *args, **kwargs):
        req.context["ca"] = self.config.instantiate_authority(req.env["HTTP_HOST"])
        return func(self, req, resp, *args, **kwargs)
    return wrapped


def validate_common_name(func):
    def wrapped(*args, **kwargs):
        if not re.match(RE_HOSTNAME, kwargs["cn"]):
            raise falcon.HTTPBadRequest("Invalid CN", "Common name supplied with request didn't pass the validation regex")
        return func(*args, **kwargs)
    return wrapped


class MyEncoder(json.JSONEncoder):
    REQUEST_ATTRIBUTES = "signable", "identity", "changed", "common_name", \
        "organizational_unit", "given_name", "surname", "fqdn", "email_address", \
        "key_type", "key_length", "md5sum", "sha1sum", "sha256sum", "key_usage"

    CERTIFICATE_ATTRIBUTES = "revokable", "identity", "changed", "common_name", \
        "organizational_unit", "given_name", "surname", "fqdn", "email_address", \
        "key_type", "key_length", "sha256sum", "serial_number", "key_usage"

    def default(self, obj):
        if isinstance(obj, crypto.X509Name):
            try:
                return ", ".join(["%s=%s" % (k.decode("ascii"),v.decode("utf-8")) for k, v in obj.get_components()])
            except UnicodeDecodeError: # Work around old buggy pyopenssl
                return ", ".join(["%s=%s" % (k.decode("ascii"),v.decode("iso8859")) for k, v in obj.get_components()])
        if isinstance(obj, ipaddress._IPAddressBase):
            return str(obj)
        if isinstance(obj, set):
            return tuple(obj)
        if isinstance(obj, datetime):
            return obj.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"
        if isinstance(obj, date):
            return obj.strftime("%Y-%m-%d")
        if isinstance(obj, map):
            return tuple(obj)
        if isinstance(obj, types.GeneratorType):
            return tuple(obj)
        if isinstance(obj, Request):
            return dict([(key, getattr(obj, key)) for key in self.REQUEST_ATTRIBUTES \
                if hasattr(obj, key) and getattr(obj, key)])
        if isinstance(obj, Certificate):
            return dict([(key, getattr(obj, key)) for key in self.CERTIFICATE_ATTRIBUTES \
                if hasattr(obj, key) and getattr(obj, key)])
        if isinstance(obj, CertificateAuthority):
            return dict(
                event_channel = obj.push_server + "/ev/" + obj.uuid,
                common_name = obj.common_name,
                certificate = obj.certificate,
                admin_users = obj.admin_users,
                autosign_subnets = obj.autosign_subnets,
                request_subnets = obj.request_subnets,
                admin_subnets=obj.admin_subnets,
                requests=obj.get_requests(),
                signed=obj.get_signed(),
                revoked=obj.get_revoked()
            )
        if hasattr(obj, "serialize"):
            return obj.serialize()
        return json.JSONEncoder.default(self, obj)


def serialize(func):
    """
    Falcon response serialization
    """
    def wrapped(instance, req, resp, **kwargs):
        assert not req.get_param("unicode") or req.get_param("unicode") == u"✓", "Unicode sanity check failed"
        resp.set_header("Cache-Control", "no-cache, no-store, must-revalidate");
        resp.set_header("Pragma", "no-cache");
        resp.set_header("Expires", "0");
        r = func(instance, req, resp, **kwargs)
        if resp.body is None:
            if req.get_header("Accept").split(",")[0] == "application/json":
                resp.set_header("Content-Type", "application/json")
                resp.append_header("Content-Disposition", "inline")
                resp.body = json.dumps(r, cls=MyEncoder)
            else:
                resp.body = repr(r)
        return r
    return wrapped


def templatize(path):
    template = env.get_template(path)
    def wrapper(func):
        def wrapped(instance, req, resp, *args, **kwargs):
            assert not req.get_param("unicode") or req.get_param("unicode") == u"✓", "Unicode sanity check failed"
            r = func(instance, req, resp, *args, **kwargs)
            r.pop("self")
            if not resp.body:
                if  req.get_header("Accept") == "application/json":
                    resp.set_header("Cache-Control", "no-cache, no-store, must-revalidate");
                    resp.set_header("Pragma", "no-cache");
                    resp.set_header("Expires", "0");
                    resp.set_header("Content-Type", "application/json")
                    r.pop("req")
                    r.pop("resp")
                    resp.body = json.dumps(r, cls=MyEncoder)
                    return r
                else:
                    resp.set_header("Content-Type", "text/html")
                    resp.body = template.render(request=req, **r)
                    return r
        return wrapped
    return wrapper


class CertificateAuthorityBase(object):
    def __init__(self, config):
        self.config = config


class RevocationListResource(CertificateAuthorityBase):
    @pop_certificate_authority
    def on_get(self, req, resp):
        resp.set_header("Content-Type", "application/x-pkcs7-crl")
        resp.append_header("Content-Disposition", "attachment; filename=%s.crl" % req.context.get("ca").common_name)
        resp.body = req.context.get("ca").export_crl()


class SignedCertificateDetailResource(CertificateAuthorityBase):
    @serialize
    @pop_certificate_authority
    @validate_common_name
    def on_get(self, req, resp, cn):
        path = os.path.join(req.context.get("ca").signed_dir, cn + ".pem")
        if not os.path.exists(path):
            raise falcon.HTTPNotFound()

        resp.append_header("Content-Disposition", "attachment; filename=%s.crt" % cn)
        return Certificate(open(path))

    @login_required
    @pop_certificate_authority
    @authorize_admin
    @validate_common_name
    def on_delete(self, req, resp, cn):
        req.context.get("ca").revoke(cn)

class LeaseResource(CertificateAuthorityBase):
    @serialize
    @login_required
    @pop_certificate_authority
    @authorize_admin
    def on_get(self, req, resp):
        from ipaddress import ip_address

        # BUGBUG
        SQL_LEASES = """
            SELECT
                acquired,
                released,
                address,
                identities.data as identity
            FROM
                addresses
            RIGHT JOIN
                identities
            ON
                identities.id = addresses.identity
            WHERE
                addresses.released <> 1
        """
        cnx = req.context.get("ca").database.get_connection()
        cursor = cnx.cursor()
        query = (SQL_LEASES)
        cursor.execute(query)

        for acquired, released, address, identity in cursor:
            yield {
                "acquired": datetime.utcfromtimestamp(acquired),
                "released": datetime.utcfromtimestamp(released) if released else None,
                "address":  ip_address(bytes(address)),
                "identity": parse_dn(bytes(identity))
            }


class SignedCertificateListResource(CertificateAuthorityBase):
    @serialize
    @pop_certificate_authority
    @authorize_admin
    @validate_common_name
    def on_get(self, req, resp):
        for j in authority.get_signed():
            yield omit(
                key_type=j.key_type,
                key_length=j.key_length,
                identity=j.identity,
                cn=j.common_name,
                c=j.country_code,
                st=j.state_or_county,
                l=j.city,
                o=j.organization,
                ou=j.organizational_unit,
                fingerprint=j.fingerprint())


class RequestDetailResource(CertificateAuthorityBase):
    @serialize
    @pop_certificate_authority
    @validate_common_name
    def on_get(self, req, resp, cn):
        """
        Fetch certificate signing request as PEM
        """
        path = os.path.join(req.context.get("ca").request_dir, cn + ".pem")
        if not os.path.exists(path):
            raise falcon.HTTPNotFound()

        resp.append_header("Content-Type", "application/x-x509-user-cert")
        resp.append_header("Content-Disposition", "attachment; filename=%s.csr" % cn)
        return Request(open(path))

    @login_required
    @pop_certificate_authority
    @authorize_admin
    @validate_common_name
    def on_patch(self, req, resp, cn):
        """
        Sign a certificate signing request
        """
        csr = req.context.get("ca").get_request(cn)
        cert = req.context.get("ca").sign(csr, overwrite=True, delete=True)
        os.unlink(csr.path)
        resp.body = "Certificate successfully signed"
        resp.status = falcon.HTTP_201
        resp.location = os.path.join(req.relative_uri, "..", "..", "signed", cn)

    @login_required
    @pop_certificate_authority
    @authorize_admin
    def on_delete(self, req, resp, cn):
        req.context.get("ca").delete_request(cn)


class RequestListResource(CertificateAuthorityBase):
    @serialize
    @pop_certificate_authority
    @authorize_admin
    def on_get(self, req, resp):
        for j in req.context.get("ca").get_requests():
            yield omit(
                key_type=j.key_type,
                key_length=j.key_length,
                identity=j.identity,
                cn=j.common_name,
                c=j.country_code,
                st=j.state_or_county,
                l=j.city,
                o=j.organization,
                ou=j.organizational_unit,
                fingerprint=j.fingerprint())

    @pop_certificate_authority
    def on_post(self, req, resp):
        """
        Submit certificate signing request (CSR) in PEM format
        """
        # Parse remote IPv4/IPv6 address
        remote_addr = ipaddress.ip_network(req.env["REMOTE_ADDR"])
        ca = req.context.get("ca")

        # Check for CSR submission whitelist
        if ca.request_subnets:
            for subnet in ca.request_subnets:
                if subnet.overlaps(remote_addr):
                    break
            else:
               raise falcon.HTTPForbidden("Forbidden", "IP address %s not whitelisted" % remote_addr)

        if req.get_header("Content-Type") != "application/pkcs10":
            raise falcon.HTTPUnsupportedMediaType(
                "This API call accepts only application/pkcs10 content type")

        body = req.stream.read(req.content_length)
        csr = Request(body)

        # Check if this request has been already signed and return corresponding certificte if it has been signed
        try:
            cert_buf = ca.get_certificate(csr.common_name)
        except FileNotFoundError:
            pass
        else:
            cert = Certificate(cert_buf)
            if cert.pubkey == csr.pubkey:
                resp.status = falcon.HTTP_SEE_OTHER
                resp.location = os.path.join(os.path.dirname(req.relative_uri), "signed", csr.common_name)
                return

        # TODO: check for revoked certificates and return HTTP 410 Gone

        # Process automatic signing if the IP address is whitelisted and autosigning was requested
        if req.get_param_as_bool("autosign"):
            for subnet in ca.autosign_subnets:
                if subnet.overlaps(remote_addr):
                    try:
                        resp.append_header("Content-Type", "application/x-x509-user-cert")
                        resp.body = ca.sign(csr).dump()
                        return
                    except FileExistsError: # Certificate already exists, try to save the request
                        pass
                    break

        # Attempt to save the request otherwise
        try:
            request = ca.store_request(body)
        except FileExistsError:
            raise falcon.HTTPConflict(
                "CSR with such CN already exists",
                "Will not overwrite existing certificate signing request, explicitly delete CSR and try again")
        ca.event_publish("request_submitted", request.fingerprint())
        # Wait the certificate to be signed if waiting is requested
        if req.get_param("wait"):
            if ca.push_server:
                # Redirect to nginx pub/sub
                url = ca.push_server + "/lp/" + request.fingerprint()
                click.echo("Redirecting to: %s"  % url)
                resp.status = falcon.HTTP_SEE_OTHER
                resp.append_header("Location", url)
            else:
                click.echo("Using dummy streaming mode, please switch to nginx in production!", err=True)
                # Dummy streaming mode
                while True:
                    sleep(1)
                    if not ca.request_exists(csr.common_name):
                        resp.append_header("Content-Type", "application/x-x509-user-cert")
                        resp.status = falcon.HTTP_201 # Certificate was created
                        resp.body = ca.get_certificate(csr.common_name)
                        break
        else:
            # Request was accepted, but not processed
            resp.status = falcon.HTTP_202


class CertificateStatusResource(CertificateAuthorityBase):
    """
    openssl ocsp -issuer CAcert_class1.pem -serial 0x<serial no in hex> -url http://localhost -CAfile cacert_both.pem
    """
    def on_post(self, req, resp):
        ocsp_request = req.stream.read(req.content_length)
        for component in decoder.decode(ocsp_request):
            click.echo(component)
        resp.append_header("Content-Type", "application/ocsp-response")
        resp.status = falcon.HTTP_200
        raise NotImplementedError()

class CertificateAuthorityResource(CertificateAuthorityBase):
    @pop_certificate_authority
    def on_get(self, req, resp):
        path = os.path.join(req.context.get("ca").certificate.path)
        resp.stream = open(path, "rb")
        resp.append_header("Content-Disposition", "attachment; filename=%s.crt" % req.context.get("ca").common_name)

class IndexResource(CertificateAuthorityBase):
    @serialize
    @login_required
    @pop_certificate_authority
    @authorize_admin
    @event_source
    def on_get(self, req, resp):
        return req.context.get("ca")

class SessionResource(CertificateAuthorityBase):
    @serialize
    @login_required
    def on_get(self, req, resp):
        return dict(
            authorities=(self.config.ca_list), # TODO: Check if user is CA admin
            username=req.context.get("user")[0]
        )

def address_to_identity(cnx, addr):
    """
    Translate currently online client's IP-address to distinguished name
    """

    SQL_LEASES = """
        SELECT
            acquired,
            released,
            identities.data as identity
        FROM
            addresses
        RIGHT JOIN
            identities
        ON
            identities.id = addresses.identity
        WHERE
            address = %s AND
            released IS NOT NULL
    """

    cursor = cnx.cursor()
    query = (SQL_LEASES)
    import struct
    cursor.execute(query, (struct.pack("!L", int(addr)),))

    for acquired, released, identity in cursor:
        return {
            "acquired": datetime.utcfromtimestamp(acquired),
            "identity": parse_dn(bytes(identity))
        }
    return None


class WhoisResource(CertificateAuthorityBase):
    @serialize
    @pop_certificate_authority
    def on_get(self, req, resp):
        identity = address_to_identity(
            req.context.get("ca").database.get_connection(),
            ipaddress.ip_address(req.get_param("address") or req.env["REMOTE_ADDR"])
        )

        if identity:
            return identity
        else:
            resp.status = falcon.HTTP_403
            resp.body = "Failed to look up node %s" % req.env["REMOTE_ADDR"]


class ApplicationConfigurationResource(CertificateAuthorityBase):
    @pop_certificate_authority
    @validate_common_name
    def on_get(self, req, resp, cn):
        ctx = dict(
            cn = cn,
            certificate = req.context.get("ca").get_certificate(cn),
            ca_certificate = open(req.context.get("ca").certificate.path, "r").read())
        resp.append_header("Content-Type", "application/ovpn")
        resp.append_header("Content-Disposition", "attachment; filename=%s.ovpn" % cn)
        resp.body = Template(open("/etc/openvpn/%s.template" % req.context.get("ca").common_name).read()).render(ctx)

    @login_required
    @pop_certificate_authority
    @authorize_admin
    @validate_common_name
    def on_put(self, req, resp, cn=None):
        pkey_buf, req_buf, cert_buf = req.context.get("ca").create_bundle(cn)

        ctx = dict(
            private_key = pkey_buf,
            certificate = cert_buf,
            ca_certificate = req.context.get("ca").certificate.dump())

        resp.append_header("Content-Type", "application/ovpn")
        resp.append_header("Content-Disposition", "attachment; filename=%s.ovpn" % cn)
        resp.body = Template(open("/etc/openvpn/%s.template" % req.context.get("ca").common_name).read()).render(ctx)


class StaticResource(object):
    def __init__(self, root):
        self.root = os.path.realpath(root)

    def __call__(self, req, resp):

        path = os.path.realpath(os.path.join(self.root, req.path[1:]))
        if not path.startswith(self.root):
            raise falcon.HTTPForbidden

        if os.path.isdir(path):
            path = os.path.join(path, "index.html")
        print("Serving:", path)

        if os.path.exists(path):
            content_type, content_encoding = mimetypes.guess_type(path)
            if content_type:
                resp.append_header("Content-Type", content_type)
            if content_encoding:
                resp.append_header("Content-Encoding", content_encoding)
            resp.stream = open(path, "rb")
        else:
            resp.status = falcon.HTTP_404
            resp.body = "File '%s' not found" % req.path



def certidude_app():
    config = CertificateAuthorityConfig()

    app = falcon.API()

    # Certificate authority API calls
    app.add_route("/api/ocsp/", CertificateStatusResource(config))
    app.add_route("/api/signed/{cn}/openvpn", ApplicationConfigurationResource(config))
    app.add_route("/api/certificate/", CertificateAuthorityResource(config))
    app.add_route("/api/revoked/", RevocationListResource(config))
    app.add_route("/api/signed/{cn}/", SignedCertificateDetailResource(config))
    app.add_route("/api/signed/", SignedCertificateListResource(config))
    app.add_route("/api/request/{cn}/", RequestDetailResource(config))
    app.add_route("/api/request/", RequestListResource(config))
    app.add_route("/api/", IndexResource(config))
    app.add_route("/api/session/", SessionResource(config))

    # Gateway API calls, should this be moved to separate project?
    app.add_route("/api/lease/", LeaseResource(config))
    app.add_route("/api/whois/", WhoisResource(config))
    return app

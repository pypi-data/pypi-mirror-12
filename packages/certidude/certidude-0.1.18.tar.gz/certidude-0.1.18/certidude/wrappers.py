import os
import hashlib
import logging
import re
import itertools
import click
import socket
import io
import urllib.request
import ipaddress
from configparser import RawConfigParser
from Crypto.Util import asn1
from OpenSSL import crypto
from datetime import datetime
from jinja2 import Environment, PackageLoader, Template
from certidude.mailer import Mailer
from certidude.signer import raw_sign, EXTENSION_WHITELIST

env = Environment(loader=PackageLoader("certidude", "email_templates"))

# https://securityblog.redhat.com/2014/06/18/openssl-privilege-separation-analysis/
# https://jamielinux.com/docs/openssl-certificate-authority/
# http://pycopia.googlecode.com/svn/trunk/net/pycopia/ssl/certs.py

def notify(func):
    # TODO: Implement e-mail and nginx notifications using hooks
    def wrapped(instance, csr, *args, **kwargs):
        cert = func(instance, csr, *args, **kwargs)
        assert isinstance(cert, Certificate), "notify wrapped function %s returned %s" % (func, type(cert))
        url_template = os.getenv("PUSH_PUBLISH")
        if url_template:
            url = url_template % dict(channel=csr.fingerprint())
            notification = urllib.request.Request(url, cert.dump().encode("ascii"))
            notification.add_header("User-Agent", "Certidude API")
            notification.add_header("Content-Type", "application/x-x509-user-cert")
            click.echo("Submitting notification to %s, waiting for response..." % url)
            response = urllib.request.urlopen(notification)
            response.read()
        return cert

# TODO: Implement e-mailing

#        self.mailer.send(
#            self.certificate.email_address,
#            (self.certificate.email_address, cert.email_address),
#            "Certificate %s signed" % cert.distinguished_name,
#            "certificate-signed",
#            old_cert=old_cert,
#            cert=cert,
#            ca=self.certificate)

    return wrapped


def subject2dn(subject):
    bits = []
    for j in "CN", "GN", "SN", "C", "S", "L", "O", "OU":
        if getattr(subject, j, None):
            bits.append("/%s=%s" % (j, getattr(subject, j)))
    return "".join(bits)

class CertificateAuthorityConfig(object):
    """
    Certificate Authority configuration

    :param path: Absolute path to configuration file.
                 Defaults to /etc/ssl/openssl.cnf
    """

    def __init__(self, path='/etc/ssl/openssl.cnf', *args):

        #: Path to file where current configuration is loaded from.
        self.path = path

        self._config = RawConfigParser()
        self._config.readfp(itertools.chain(["[global]"], open(self.path)))

    def get(self, section, key, default=""):
        if self._config.has_option(section, key):
            return self._config.get(section, key)
        else:
            return default

    def instantiate_authority(self, slug):
        section = "CA_" + slug

        dirs = dict([(key, self.get(section, key))
            for key in ("dir", "certificate", "crl", "certs", "new_certs_dir", "private_key", "revoked_certs_dir", "request_subnets", "autosign_subnets", "admin_subnets", "admin_users")])

        # Variable expansion, eg $dir
        for key, value in dirs.items():
            if "$" in value:
                dirs[key] = re.sub(r'\$([a-z]+)', lambda m:dirs[m.groups()[0]], value)

        dirs.pop("dir")
        dirs["email_address"] = self.get(section, "emailAddress")
        dirs["inbox"] = self.get(section, "inbox")
        dirs["outbox"] = self.get(section, "outbox")
        dirs["certificate_lifetime"] = int(self.get(section, "default_days", "1825"))
        dirs["revocation_list_lifetime"] = int(self.get(section, "default_crl_days", "1"))

        extensions_section = self.get(section, "x509_extensions")
        if extensions_section:
            dirs["basic_constraints"] = self.get(extensions_section, "basicConstraints")
            dirs["key_usage"] = self.get(extensions_section, "keyUsage")
            dirs["extended_key_usage"] = self.get(extensions_section, "extendedKeyUsage")
        authority = CertificateAuthority(slug, **dirs)
        return authority


    def all_authorities(self, wanted=None):
        for ca in self.ca_list:
            if wanted and ca not in wanted:
                continue
            try:
                yield self.instantiate_authority(ca)
            except FileNotFoundError:
                pass


    @property
    def ca_list(self):
        """
        Returns sorted list of CA-s defined in the configuration file.
        """
        l = [s[3:] for s in self._config if s.startswith("CA_")]
        # Sanity check for duplicates (although ConfigParser fails earlier)
        if len(l) != len(set(l)):
            raise ValueError
        return sorted(l)


    def pop_certificate_authority(self):
        def wrapper(func):
            def wrapped(*args, **kwargs):
                slug = kwargs.pop("ca")
                kwargs["ca"] = self.instantiate_authority(slug)
                return func(*args, **kwargs)
            return wrapped
        return wrapper

class CertificateBase:
    @property
    def given_name(self):
        return self.subject.GN

    @given_name.setter
    def given_name(self, value):
        return setattr(self.subject, "GN", value)

    @property
    def surname(self):
        return self.subject.SN

    @surname.setter
    def surname(self, value):
        return setattr(self.subject, "SN", value)

    @property
    def common_name(self):
        return self.subject.CN

    @common_name.setter
    def common_name(self, value):
        return setattr(self._obj.get_subject(), "CN", value)

    @property
    def country_code(self):
        return getattr(self._obj.get_subject(), "C", None)

    @property
    def state_or_county(self):
        return getattr(self._obj.get_subject(), "S", None)

    @property
    def city(self):
        return getattr(self._obj.get_subject(), "L", None)

    @property
    def organization(self):
        return getattr(self._obj.get_subject(), "O", None)

    @property
    def organizational_unit(self):
        return getattr(self._obj.get_subject(), "OU", None)

    @country_code.setter
    def country_code(self, value):
        return setattr(self._obj.get_subject(), "C", value)

    @state_or_county.setter
    def state_or_county(self, value):
        return setattr(self._obj.get_subject(), "S", value)

    @city.setter
    def city(self, value):
        return setattr(self._obj.get_subject(), "L", value)

    @organization.setter
    def organization(self, value):
        return setattr(self._obj.get_subject(), "O", value)

    @organizational_unit.setter
    def organizational_unit(self, value):
        return setattr(self._obj.get_subject(), "OU", value)

    @property
    def key_usage(self):
        def iterate():
            for key, value, data in self.extensions:
                if key == "keyUsage" or key == "extendedKeyUsage":
                    for bit in value.split(", "):
                        if bit == "1.3.6.1.5.5.8.2.2":
                            yield "IKE Intermediate"
                        else:
                            yield bit
        return ", ".join(iterate())

    @property
    def subject(self):
        return self._obj.get_subject()

    @property
    def issuer(self):
        return self._obj.get_issuer()

    @property
    def issuer_dn(self):
        return subject2dn(self.issuer)

    @property
    def distinguished_name(self):
        return subject2dn(self.subject)

    @property
    def key_length(self):
        return self._obj.get_pubkey().bits()

    @property
    def key_type(self):
        if self._obj.get_pubkey().type() == 6:
            return "RSA"
        else:
            raise NotImplementedError()

    @property
    def extensions(self):
        for e in self._obj.get_extensions():
            yield e.get_short_name().decode("ascii"), str(e), e.get_data()

    def set_extensions(self, extensions):
        # X509Req().add_extensions() first invocation takes only effect?!
        assert self._obj.get_extensions() == [], "Extensions already set!"

        self._obj.add_extensions([
            crypto.X509Extension(
                key.encode("ascii"),
                critical,
                value.encode("ascii")) for (key,value,critical) in extensions])

    @property
    def email_address(self):
        for bit in self.subject_alt_name.split(", "):
            if bit.startswith("email:"):
                return bit[6:]
        return ""

    @property
    def subject_alt_name(self):
        for key, value, data in self.extensions:
            if key == "subjectAltName":
                return value
        return ""

    @subject_alt_name.setter
    def subject_alt_name(self, value):
        self.set_extension("subjectAltName", value, False)

    @property
    def pubkey(self):
        pubkey_asn1=crypto.dump_privatekey(crypto.FILETYPE_ASN1, self._obj.get_pubkey())
        pubkey_der=asn1.DerSequence()
        pubkey_der.decode(pubkey_asn1)
        zero, modulo, exponent = pubkey_der
        return modulo, exponent

    @property
    def pubkey_hex(self):
        modulo, exponent = self.pubkey
        h = "%x" % modulo
        assert len(h) * 4 == self.key_length, "%s is not %s" % (len(h)*4, self.key_length)
        return re.findall("\d\d", h)

    def fingerprint(self):
        import binascii
        m, _ = self.pubkey
        return ":".join(re.findall("..", hashlib.sha1(binascii.unhexlify("%x" % m)).hexdigest()))


class Request(CertificateBase):
    def __init__(self, mixed=None):
        self.buf = None
        self.path = NotImplemented
        self.created = NotImplemented

        if isinstance(mixed, io.TextIOWrapper):
            self.path = mixed.name
            _, _, _, _, _, _, _, _, mtime, _ = os.stat(self.path)
            self.created = datetime.fromtimestamp(mtime)
            mixed = mixed.read()
        if isinstance(mixed, bytes):
            mixed = mixed.decode("ascii")
        if isinstance(mixed, str):
            try:
                self.buf = mixed
                mixed = crypto.load_certificate_request(crypto.FILETYPE_PEM, mixed)
            except crypto.Error:
                print("Failed to parse:", mixed)
                raise

        if isinstance(mixed, crypto.X509Req):
            self._obj = mixed
        else:
            raise ValueError("Can't parse %s as X.509 certificate signing request!" % mixed)

        assert not self.buf or self.buf == self.dump(), "%s is not %s" % (repr(self.buf), repr(self.dump()))

    @property
    def signable(self):
        for key, value, data in self.extensions:
            if key not in EXTENSION_WHITELIST:
                return False
        return True

    def dump(self):
        return crypto.dump_certificate_request(crypto.FILETYPE_PEM, self._obj).decode("ascii")

    def __repr__(self):
        return "Request(%s)" % repr(self.path)

    def create(self):
        # Generate 4096-bit RSA key
        key = crypto.PKey()
        key.generate_key(crypto.TYPE_RSA, 4096)

        # Create request
        req = crypto.X509Req()
        req.set_pubkey(key)
        return Request(req)

class Certificate(CertificateBase):
    def __init__(self, mixed):
        self.buf = NotImplemented
        self.path = NotImplemented
        self.changed = NotImplemented

        if isinstance(mixed, io.TextIOWrapper):
            self.path = mixed.name
            _, _, _, _, _, _, _, _, _, ctime = os.stat(self.path)
            self.changed = datetime.fromtimestamp(ctime)
            mixed = mixed.read()

        if isinstance(mixed, str):
            try:
                self.buf = mixed
                mixed = crypto.load_certificate(crypto.FILETYPE_PEM, mixed)
            except crypto.Error:
                print("Failed to parse:", mixed)
                raise

        if isinstance(mixed, crypto.X509):
            self._obj = mixed
        else:
            raise ValueError("Can't parse %s as X.509 certificate!" % mixed)

        assert not self.buf or self.buf == self.dump(), "%s is not %s" % (self.buf, self.dump())

    @property
    def extensions(self):
        # WTF?!
        for j in range(1, self._obj.get_extension_count()):
            e = self._obj.get_extension(j)
            yield e.get_short_name().decode("ascii"), str(e), e.get_data()

    @property
    def serial_number(self):
        return "%040x" % self._obj.get_serial_number()

    @property
    def signed(self):
        return datetime.strptime(self._obj.get_notBefore().decode("ascii"), "%Y%m%d%H%M%SZ")

    @property
    def expires(self):
        return datetime.strptime(self._obj.get_notAfter().decode("ascii"), "%Y%m%d%H%M%SZ")

    def dump(self):
        return crypto.dump_certificate(crypto.FILETYPE_PEM, self._obj).decode("ascii")

    def digest(self):
        return self._obj.digest("md5").decode("ascii")

    def __eq__(self, other):
        return self.serial_number == other.serial_number

    def __gt__(self, other):
        return self.signed > other.signed

    def __lt__(self, other):
        return self.signed < other.signed

    def __gte__(self, other):
        return self.signed >= other.signed

    def __lte__(self, other):
        return self.signed <= other.signed

class CertificateAuthority(object):
    def __init__(self, slug, certificate, crl, certs, new_certs_dir, revoked_certs_dir=None, private_key=None, autosign_subnets=None, request_subnets=None, admin_subnets=None, admin_users=None, email_address=None, inbox=None, outbox=None, basic_constraints="CA:FALSE", key_usage="digitalSignature,keyEncipherment", extended_key_usage="clientAuth", certificate_lifetime=5*365, revocation_list_lifetime=1):
        self.slug = slug
        self.revocation_list = crl
        self.signed_dir = certs
        self.request_dir = new_certs_dir
        self.revoked_dir = revoked_certs_dir
        self.private_key = private_key

        self.admin_subnets = set([ipaddress.ip_network(j) for j in admin_subnets.split(" ") if j])
        self.autosign_subnets = set([ipaddress.ip_network(j) for j in autosign_subnets.split(" ") if j])
        self.request_subnets = set([ipaddress.ip_network(j) for j in request_subnets.split(" ") if j]).union(self.autosign_subnets)

        self.certificate = Certificate(open(certificate))
        self.mailer = Mailer(outbox) if outbox else None
        self.certificate_lifetime = certificate_lifetime
        self.revocation_list_lifetime = revocation_list_lifetime
        self.basic_constraints = basic_constraints
        self.key_usage = key_usage
        self.extended_key_usage = extended_key_usage

        self.admin_emails = dict()
        self.admin_users = set()
        if admin_users:
            if admin_users.startswith("/"):
                for user in open(admin_users):
                    if ":" in user:
                        user, email, first_name, last_name = user.split(":")
                    self.admin_emails[user] = email
                    self.admin_users.add(user)
            else:
                self.admin_users = set([j for j in admin_users.split(" ") if j])

    def _signer_exec(self, cmd, *bits):
        sock = self.connect_signer()
        sock.send(cmd.encode("ascii"))
        sock.send(b"\n")
        for bit in bits:
            sock.send(bit.encode("ascii"))
        sock.sendall(b"\n\n")
        buf = sock.recv(8192)
        if not buf:
            raise
        return buf

    def __repr__(self):
        return "CertificateAuthority(slug=%s)" % repr(self.slug)

    def get_certificate(self, cn):
        return open(os.path.join(self.signed_dir, cn + ".pem")).read()

    def connect_signer(self):
        sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        sock.connect("/run/certidude/signer/%s.sock" % self.slug)
        return sock

    def revoke(self, cn):
        cert = Certificate(open(os.path.join(self.signed_dir, cn + ".pem")))
        revoked_filename = os.path.join(self.revoked_dir, "%s.pem" % cert.serial_number)
        os.rename(cert.path, revoked_filename)

    def get_revoked(self):
        for root, dirs, files in os.walk(self.revoked_dir):
            for filename in files:
                if filename.endswith(".pem"):
                    yield Certificate(open(os.path.join(root, filename)))
            break

    def get_signed(self):
        for root, dirs, files in os.walk(self.signed_dir):
            for filename in files:
                if filename.endswith(".pem"):
                    yield Certificate(open(os.path.join(root, filename)))
            break

    def get_requests(self):
        for root, dirs, files in os.walk(self.request_dir):
            for filename in files:
                if filename.endswith(".pem"):
                    yield Request(open(os.path.join(root, filename)))
            break

    def get_request(self, cn):
        return Request(open(os.path.join(self.request_dir, cn + ".pem")))

    def store_request(self, buf, overwrite=False):
        request = crypto.load_certificate_request(crypto.FILETYPE_PEM, buf)
        common_name = request.get_subject().CN
        request_path = os.path.join(self.request_dir, common_name + ".pem")

        # If there is cert, check if it's the same
        if os.path.exists(request_path):
            if open(request_path, "rb").read() != buf:
                print("Request already exists, not creating new request")
                raise FileExistsError("Request already exists")
        else:
            with open(request_path + ".part", "wb") as fh:
                fh.write(buf)
            os.rename(request_path + ".part", request_path)

        return Request(open(request_path))

    def request_exists(self, cn):
        return os.path.exists(os.path.join(self.request_dir, cn + ".pem"))

    def delete_request(self, cn):
        os.unlink(os.path.join(self.request_dir, cn + ".pem"))

    def create_bundle(self, common_name, organizational_unit=None, email_address=None, overwrite=True):
        req = Request.create()
        req.country = self.certificate.country
        req.state_or_county = self.certificate.state_or_county
        req.city = self.certificate.city
        req.organization = self.certificate.organization
        req.organizational_unit = organizational_unit or self.certificate.organizational_unit
        req.common_name = common_name
        req.email_address = email_address
        cert_buf = self.sign(req, overwrite)
        return crypto.dump_privatekey(crypto.FILETYPE_PEM, key).decode("ascii"), \
            req_buf, cert_buf

    @notify
    def sign(self, req, overwrite=False, delete=True):
        """
        Sign certificate signing request via signer process
        """

        cert_path = os.path.join(self.signed_dir, req.common_name + ".pem")

        # Move existing certificate if necessary
        if os.path.exists(cert_path):
            old_cert = Certificate(open(cert_path))
            if overwrite:
                self.revoke(req.common_name)
            elif req.pubkey == old_cert.pubkey:
                return old_cert
            else:
                raise FileExistsError("Will not overwrite existing certificate")

        # Sign via signer process
        cert_buf = self._signer_exec("sign-request", req.dump())
        with open(cert_path + ".part", "wb") as fh:
            fh.write(cert_buf)
        os.rename(cert_path + ".part", cert_path)

        return Certificate(open(cert_path))

    @notify
    def sign2(self, request, overwrite=False, delete=True, lifetime=None):
        """
        Sign directly using private key, this is usually done by root.
        Basic constraints and certificate lifetime are copied from openssl.cnf,
        lifetime may be overridden on the command line,
        other extensions are copied as is.
        """
        cert = raw_sign(
            crypto.load_privatekey(crypto.FILETYPE_PEM, open(self.private_key).read()),
            self.certificate._obj,
            request._obj,
            self.basic_constraints,
            lifetime=lifetime or self.certificate_lifetime)

        path = os.path.join(self.signed_dir, request.common_name + ".pem")
        if os.path.exists(path):
            if overwrite:
                self.revoke(request.common_name)
            else:
                raise FileExistsError("File %s already exists!" % path)

        buf = crypto.dump_certificate(crypto.FILETYPE_PEM, cert)
        with open(path + ".part", "wb") as fh:
            fh.write(buf)
        os.rename(path + ".part", path)
        click.echo("Wrote certificate to: %s" % path)
        if delete:
            os.unlink(request.path)
            click.echo("Deleted request: %s" % request.path)

        return Certificate(open(path))

    def export_crl(self):
        sock = self.connect_signer()
        sock.send(b"export-crl\n")
        for filename in os.listdir(self.revoked_dir):
            if not filename.endswith(".pem"):
                continue
            serial_number = filename[:-4]
            # TODO: Assert serial against regex
            revoked_path = os.path.join(self.revoked_dir, filename)
            # TODO: Skip expired certificates
            s = os.stat(revoked_path)
            sock.send(("%s:%d\n" % (serial_number, s.st_ctime)).encode("ascii"))
        sock.sendall(b"\n")
        return sock.recv(32*1024*1024)


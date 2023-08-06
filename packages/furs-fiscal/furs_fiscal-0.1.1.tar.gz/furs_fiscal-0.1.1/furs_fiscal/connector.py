import os
import urllib3.contrib.pyopenssl
urllib3.contrib.pyopenssl.inject_into_urllib3()

import tempfile
import requests

from OpenSSL import crypto
from jose import jws


FURS_TEST_ENDPOINT = 'https://blagajne-test.fu.gov.si:9002'
FURS_PRODUCTION_ENDPOINT = 'https://blagajne-test.fu.gov.si:9002'

FURS_TEST_CERT = os.path.join(os.path.dirname(__file__), 'certs/test_certificate.pem')
# TODO add production CERT to certs
FURS_PRODUCTION_CERT = os.path.join(os.path.dirname(__file__), 'certs/test_certificate.pem')


class Connector():
    """
    Connector performs all the communication with the FURS server.

    """
    def __init__(self, p12_path, p12_password, production=True, request_timeout=2):
        """
        Initializes and loads certs to memory.

        :param p12_path: (string) Path to the .p12 file for current client
        :param p12_password: (string) Password for the .p12 file
        :param production: (boolean) Should we use FURS Production server of Test server
        :param request_timeout: (float) How long should we wait for the request to timeout
        :return: None
        """
        self.p12_path = p12_path
        self.endpoint = FURS_PRODUCTION_ENDPOINT if production else FURS_TEST_ENDPOINT
        self.cert = FURS_PRODUCTION_CERT if production else FURS_TEST_CERT

        self.p12 = None
        self.cert_temp = None
        self.pkey_temp = None

        self.request_timeout = request_timeout

        self.furs_cert = open(self.cert, 'rt').read()
        # load certificate...
        self._load_p12(p12_password)

    def _load_p12(self, p12_password):
        """
        Load .p12 cert to memory

        :param p12_password: (string) password for the .p12 file
        :return: None
        """
        self.p12 = crypto.load_pkcs12(buffer=file(self.p12_path, 'rb').read(), passphrase=p12_password)
        self._store_temp_files()

    def _store_temp_files(self):
        """
        Requests library requires string path to PKey and Cert - therefore we save those into
        temporary files on the file system.

        :return: None
        """
        self.cert_temp = tempfile.NamedTemporaryFile(delete=False)
        self.cert_temp.write(crypto.dump_certificate(crypto.FILETYPE_PEM, self.p12.get_certificate()))
        self.cert_temp.close()

        self.pkey_temp = tempfile.NamedTemporaryFile(delete=False)
        self.pkey_temp.write(crypto.dump_privatekey(crypto.FILETYPE_PEM, self.p12.get_privatekey()))
        self.pkey_temp.close()

    def _get_jws_header(self):
        """
        Prepare JWS Header dictionary based on the client certificate data.

        :return: (dict) JWS header
        """
        jws_header = {
            'alg': 'RS256',
            'subject_name': ",".join(["=".join(tpl) for tpl in self.p12.get_certificate().get_subject().get_components()]),
            'issuer_name': ",".join(["=".join(tpl) for tpl in self.p12.get_certificate().get_issuer().get_components()]),
            'serial': self.p12.get_certificate().get_serial_number()
        }

        return jws_header

    def _jwt_sign(self, header, payload, algorithm=jws.ALGORITHMS.RS256):
        """
        Perform JWT signature of the header and payload.

        :param header: (dict) JWS header dictionary
        :param payload: (dict) content to sign
        :param algorithm: (string) which algorithm to use. Default: 'RS256'
        :return: (string) Signed base64 encoded content
        """
        secret = crypto.dump_privatekey(crypto.FILETYPE_PEM, self.p12.get_privatekey())

        return jws.sign(claims=payload,
                        key=secret,
                        headers=header,
                        algorithm=algorithm)

    def post(self, path, json):
        """
        Perform POST request to the FURS server for a given path endpoint. This wrapper will
        prepare JWS header and sign the message according to the JWT specification.

        :param path: (string) path to the endpoint e.g 'v1/cash_registers/invoices'
        :param json: (dict) data to send
        :return: response object
        """
        data = {
            'token': self._jwt_sign(header=self._get_jws_header(),
                                    payload=json)
        }

        return requests.post(url='%s/%s' % (self.endpoint, path),
                             json=data,
                             cert=(self.cert_temp.name, self.pkey_temp.name),
                             verify=self.cert,
                             headers=self._prepare_headers(),
                             timeout=self.request_timeout)

    def send_echo(self, message='ping'):
        """
        Sends echo request to the FURS server. Echo request does not perform any type of
        message signing, therefore it should not be used to validate the client certificate.
        Instead it's commonly used to determine if the FURS server is accessible.

        :param message: (string) a message to send to FURS.
        :return: response object
        """
        data = {
            'EchoRequest': message,
        }

        return requests.post(url='%s/%s' % (self.endpoint, 'v1/cash_registers/echo'),
                             json=data,
                             cert=(self.cert_temp.name, self.pkey_temp.name),
                             verify=self.cert,
                             headers=self._prepare_headers(),
                             timeout=self.request_timeout)

    def _prepare_headers(self):
        """
        Prepare request header so that the FURS server will accept our request.

        :return: (dict) request header
        """
        return {'Content-Type': 'application/json; charset=UTF-8'}




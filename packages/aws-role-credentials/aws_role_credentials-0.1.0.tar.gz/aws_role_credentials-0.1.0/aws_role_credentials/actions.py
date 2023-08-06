# -*- coding: utf-8 -*-

import boto.sts

from aws_role_credentials.models import SamlAssertion, AwsCredentialsFile

class Actions:

    def __init__(self, credentials_filename,
                 profile,
                 region):
                 self.credentials_file = AwsCredentialsFile(credentials_filename)
                 self.profile = profile
                 self.region = region

    def credentials_from_saml(self, assertion):
        assertion = SamlAssertion(assertion)
        role = assertion.roles()[0]

        conn = boto.sts.connect_to_region(self.region, anon=True)
        token = conn.assume_role_with_saml(role['role'], role['principle'],
                                           assertion.encode())

        self.credentials_file.add_profile(self.profile,
                                          self.region,
                                          token.credentials)

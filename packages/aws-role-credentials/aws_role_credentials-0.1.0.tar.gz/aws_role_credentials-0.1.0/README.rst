===============================
AWS Role Credentials
===============================

.. image:: https://img.shields.io/pypi/v/aws_role_credentials.svg
        :target: https://pypi.python.org/pypi/aws_role_credentials


Generates AWS credentials for roles using STS and writes them to ```~/.aws/credentials```

Usage
=====

Simple pipe a SAML assertion into awssaml

    # create credentials from saml assertion

    $ oktaauth -u joebloggs | ./aws_role_credentials --profile dev


Options
=======

    --profile          Use a specific profile in your credential file (e.g. Development).  Defaults to sts.
    --region           The region to use. Overrides config/env settings.  Defaults to us-east-1.


Thanks
======

Thanks to Quint Van Deman of AWS for demonstrating how to do this. https://blogs.aws.amazon.com/security/post/Tx1LDN0UBGJJ26Q/How-to-Implement-Federated-API-and-CLI-Access-Using-SAML-2-0-and-AD-FS


Authors
=======

* Peter Gillard-Moss

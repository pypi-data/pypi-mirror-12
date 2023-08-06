===============================
AWS Role Credentials
===============================

.. image:: https://img.shields.io/pypi/v/aws_role_credentials.svg
        :target: https://pypi.python.org/pypi/aws_role_credentials


Generates AWS credentials for roles using STS and writes them to ```~/.aws/credentials```

Usage
=====

Simply pipe a SAML assertion into awssaml

    # create credentials from saml assertion

    $ oktaauth -u joebloggs | aws_role_credentials saml --profile dev


Or for assuming a role using an IAM user:

    # create credentials from an iam user

    $ aws_role_credentials user arn:aws:iam::111111:role/dev joebloggs-session --profile dev


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




History
-------

0.1.0 (2015-01-11)
---------------------

* First release on PyPI.



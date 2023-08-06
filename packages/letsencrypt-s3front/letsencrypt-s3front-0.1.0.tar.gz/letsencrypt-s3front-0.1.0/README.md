## S3/CloudFront plugin for Let's Encrypt client

Use the letsencrypt client to generate and install a certificate to be used with
an AWS CloudFront distribution of an S3 bucket.

### Before you start

Follow a guide like this one [http://docs.aws.amazon.com/gettingstarted/latest/swh/website-hosting-intro.html]()
to use S3 and CloudFront for static site hosting.

Once you are done you should have a domain pointing to a CloudFront distribution
that will use an S3 bucket for origin. It is important for the certificate
validation that both HTTP and HTTPS traffic are enabled (at least while you get
  the certificate).

### Setup

1. Install the letsencrypt client [https://letsencrypt.readthedocs.org/en/latest/using.html#installation]()
1. Clone this repo locally: `git clone https://github.com/dlapiduz/letsencrypt-s3front.git`
1. Install it:

   ```
  cd letsencrypt-s3front
  python setup.py Install
  ```

### How to use it

To generate a certificate and install it in a CloudFront distribution:
```
AWS_ACCESS_KEY_ID="your_key" \
AWS_SECRET_ACCESS_KEY="your_secret" \
letsencrypt --agree-tos -a letsencrypt-s3front:auth \
--letsencrypt-s3front:auth-s3-bucket the_bucket \
-i letsencrypt-s3front:installer \
--letsencrypt-s3front:installer-cf-distribution-id your_cf_distribution_id \
-d the_domain
```

Follow the screen prompts and you should end up with the certificate in your
distribution. It may take a couple minutes to update.

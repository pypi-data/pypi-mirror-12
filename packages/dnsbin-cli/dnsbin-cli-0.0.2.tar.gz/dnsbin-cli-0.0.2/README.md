# dnsbin-cli
[![Build Status](https://travis-ci.org/thomas-maurice/dnsbin-cli.svg?branch=v0.0.1)](https://travis-ci.org/thomas-maurice/dnsbin-cli)

This is the commandline for the dnsbin project (https://github.com/thomas-maurice/dnsbin)

# Using the commandline
To use the command line you need to install few packages using pip :
```bash
pip install requests dnspython clifactory
```
## Posting a file
```bash
./dnsbin.py post someserver.tld file_name
87597b44-d913-4740-9091-d9bd62b8f422
```

Note that if the file is not ascii only, it will be encoded
before being uploaded.

Done ! Your paste has id `87597b44-d913-4740-9091-d9bd62b8f422`

## Getting a paste
```bash
./dnsbin.py get someserver.tld 87597b44-d913-4740-9091-d9bd62b8f422
Paste is 15 chunks long
 * Getting 1.87597b44-d913-4740-9091-d9bd62b8f422 chunk
 * Getting 2.87597b44-d913-4740-9091-d9bd62b8f422 chunk
  ... Some more chunks ...
 * Getting 14.87597b44-d913-4740-9091-d9bd62b8f422 chunk
 * Getting 15.87597b44-d913-4740-9091-d9bd62b8f422 chunk
Your paste :
 ... The text you did paste ! ...
```

That was easy :)

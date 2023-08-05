# SMSTeknik

Unofficial client for [smsteknik](http://smsteknik.se)

# Commandline

    usage: smsteknik [-h] [-t TO] [-m MESSAGE] [-c CONFIG]

    Send SMS

    optional arguments:
      -h, --help            show this help message and exit
      -t TO, --to TO        recipients
      -m MESSAGE, --message MESSAGE
                            Text to send
      -c CONFIG, --config CONFIG
                            Configuration file


## Example CLI

```bash
smsteknik --to '0700000000' --message 'Hello!'
```

## Example code

```python
client = SMSTeknikClient(id=..., user=..., password=..., ...)
client.send(['+4673XXXXXXX', '+46707XXXXXX'], 'Hello Wörld!')
```


# Configuration format

```ini
[SMS Teknik]
# Required login fields
id=My Company
user=smsAbc123
password=def456

# Sender shown to recipient
# Max 11 alphanumerics or 15 numbers
#smssender=My Company

# Delivery report
#  off (Default)
#  email
#  get    HTTP GET
#  post   HTTP POST
#  xml    HTTP XML
#deliverystatustype=off

# URL or email
#deliverystatusaddress=smsteknik-delivery@example.com

# Allow splitting long SMS (>160 chars)
#  0 = Off
#  1 = On (Default)
#multisms=1

# Custom API URL
#url=https://www.smsteknik.se/Member/SMSConnectDirect/SendSMSv3.asp

# Reply (Additional service needed from SMS Teknik)
#usereplynumber=0
#usereplyforwardtype=0
#usereplyforwardurl=
```

# Generate code documentation

    sphinx-build -b html docs docs/_build/smsteknik
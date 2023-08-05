# Pykkelabels

Python implementation of the Pakkelabels.dk php package for interacting with the Pakkelabels.dk web service.
For documentation on usage and the methods, see the documentation [here](https://www.pakkelabels.dk/integration/api/).

## Installation

Easiest way is to install the package using pip:
```
pip install Pykkelabels
```

Alternatively, download the repository from github and put the Pykkelabels folder into your project folder.

## Usage

Import the package and accompanying exceptions using:
```
from pykkelabels import Pykkelabels, URLError, HTTPError
```

The first thing required is to login:
```
label = new Pykkelabels('api_user', 'api_key')
```

This will login and fetch the required token.
The token is then automatically added to any subsequent calls.

To see the generated token you can use:
```
print(label.getToken())
```

### Examples:
Get all Post Danmark labels shipped to Denmark:
```
labels = label.shipments({'shipping_agent': 'pdk', 'receiver_country': 'DK'})
```

Get the PDF for a specific label:
```
import base64
base64 = label.pdf(31629)
pdf = base64.b64decode(base64)
```

### Exceptions:
If there is problems with the connectivity to the server, or if the returned data is not parsable, a URLError is raised.
If the server returns an error a HTTPError exception is raised, with a message containing the error message from the server.

## Contributing

See the github guide to contributing [here](https://guides.github.com/activities/contributing-to-open-source/).

## History

- v0.1: First working release. Most of the functionality is still untested.
- v0.1.1: Added unittests to the methods where it is possible
- v0.1.2: Prepared pypi release
- v0.1.3: Added better error handling, and added custom exception. Added testing for bad inputs. Implemented better test of pdf generation.  
- v0.1.4: Removed inwanted files from pypi release

## Credits

Anders Winther Brandt

## License

MIT, see LICENSE file
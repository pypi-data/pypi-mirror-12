# clone-github

> Clone github repos in bulk

# Installation

- `sudo pip install clone-github`
  - On Mac: Installs to `/Library/Python/2.X/site-packages`

# Instructions

```
Usage: clone-github [options]

Options:
  -h, --help                Show this help message and exit
  -o ORG, --org=ORG         Github.com organization name. Assumes Oauth user if
                            omitted.
  -u USER, --user=USER      Github.com user name. Assumes Oauth user if omitted.
  -t TOKEN, --token=TOKEN   OAuth Access Token.
  -p, --private             List only Private repos. Default is Public.
  -r, --run                 Execute changes. Default is Dry Run.
```

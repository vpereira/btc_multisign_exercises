# you need pycoin installed
# pip install pycoin
# we are generating keys/addresses to testnet
ku -n XTN  `< /dev/urandom tr -dc A-F0-9 | head -c${1:-32} | sha256sum | cut -f1 -d ' '`

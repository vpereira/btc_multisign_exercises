// generate private keys and save it in the WIF format
bitcore = require('bitcore');

var PublicKey  = bitcore.PublicKey;
var PrivateKey = bitcore.PrivateKey;
var Address = bitcore.Address;
var Networks = bitcore.Networks;
var fs = require('fs');

Networks.defaultNetwork = Networks.testnet;

var numOfKeys = 3;

function SaveFile(privateKeys) {
  var jsonKeys = JSON.stringify(privateKeys);
  fs.writeFile('keys.json', jsonKeys, function(err) {
    if (err) {
      console.log("couldnt save keys into keys.json");
      console.log(err.message);
      return;
    }
  });
}

var privateKeys = [];

for(i = 0; i < numOfKeys; i++) {
  privateKeys.push(new PrivateKey().toWIF());
}

SaveFile(privateKeys);

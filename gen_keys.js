// generate private keys and save it in the WIF format
var PublicKey = require('bitcore').PublicKey;
var Address = require('bitcore').Address;
var Networks = require('bitcore').Networks;
var PrivateKey = require('bitcore').PrivateKey;
var fs = require('fs');

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
  privateKeys.push(new PrivateKey(Networks.testnet).toWIF());
}

SaveFile(privateKeys);

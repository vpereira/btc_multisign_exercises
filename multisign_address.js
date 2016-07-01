var PublicKey  = require('bitcore').PublicKey;
var PrivateKey = require('bitcore').PrivateKey;
var Address = require('bitcore').Address;
var Networks = require('bitcore').Networks;
var Transaction = require('bitcore').Transaction;
var fs = require('fs');

fs.readFile('keys.json', function(err, data){
  var publicKeys = [];

  if(err) {
    return console.log(err.message);
  }
  var jsonArray = JSON.parse(data);
  for(i = 0; i < jsonArray.length; i++) {
    var privKey = PrivateKey.fromWIF(jsonArray[i]);
    publicKeys.push(privKey.toPublicKey().toString());
  }
  var requiredSignatures = 2;
  var address = new Address(publicKeys, requiredSignatures,Networks.testnet);

  console.log(address.toString());

});

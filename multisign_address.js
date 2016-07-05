bitcore = require('bitcore');

var PublicKey  = bitcore.PublicKey;
var PrivateKey = bitcore.PrivateKey;
var Address = bitcore.Address;
var Networks = bitcore.Networks;
var Transaction = bitcore.Transaction;
var fs = require('fs');

Networks.defaultNetwork = Networks.testnet;


fs.readFile('keys.json', function(err, data){
  var publicKeys = [];

  if(err) {
    return console.log(err.message);
  }
  var jsonArray = JSON.parse(data);
  for(let i = 0; i < jsonArray.length; i++) {
    var privKey = PrivateKey.fromWIF(jsonArray[i]);
    publicKeys.push(privKey.toPublicKey().toString());
  }
  var requiredSignatures = 2;
  var address = new Address(publicKeys, requiredSignatures);

  console.log(address.toString());

});

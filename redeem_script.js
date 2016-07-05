// if you have to regenerate your redeem script.
// you can use this script

// it will extract the public keys from your keys.json private keys
// please set the requiredSignatures variable as necessary
bitcore = require('bitcore');

var PrivateKey = bitcore.PrivateKey;
var Networks = bitcore.Networks;
var Script = bitcore.Script;
var fs = require('fs');

var publicKeys = [];

fs.readFile('keys.json', function(err, data){
  if(err) {
    return console.log(err.message);
  }
  var jsonArray = JSON.parse(data);
  for(let i = 0; i < jsonArray.length; i++) {
    var privKey = PrivateKey.fromWIF(jsonArray[i]);
    publicKeys.push(privKey.toPublicKey());
  }
  var requiredSignatures = 2;

  var redeemScript = Script.buildMultisigOut(publicKeys, requiredSignatures);
  var script = redeemScript.toScriptHashOut();
  console.log(script.toString());
});

bitcore = require('bitcore');

var PublicKey  = bitcore.PublicKey;
var PrivateKey = bitcore.PrivateKey;
var Address = bitcore.Address;
var Networks = bitcore.Networks;
var fs = require('fs');


fs.readFile('keys.json', function(err, data){
  if(err) {
    return console.log(err.message);
  }
  var jsonArray = JSON.parse(data);
  for(let i = 0; i < jsonArray.length; i++) {
    console.log('privKey',i,jsonArray[i]); // WIF
    var privKey = PrivateKey.fromWIF(jsonArray[i]);
    console.log('pubKey',i,privKey.toPublicKey().toString()); // COMPRESSED
    console.log('addr',i,privKey.toAddress().toString()); // COMPRESSED
  }
});

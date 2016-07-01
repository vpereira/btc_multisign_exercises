//
// unlock a P2SH transaction
// please check http://tbtc.blockr.io/tx/info/d496ad5da0cded93c2b3a90ae6a8e3ef9e0bbe080bb768ce3d1b31fbc05ef831
// and
// bitcoin-cli -testnet gettransaction d496ad5da0cded93c2b3a90ae6a8e3ef9e0bbe080bb768ce3d1b31fbc05ef831

var PublicKey = require('bitcore').PublicKey;
var PrivateKey = require('bitcore').PrivateKey;
var Address = require('bitcore').Address;
var Networks = require('bitcore').Networks;
var Transaction = require('bitcore').Transaction;
var Script = require('bitcore').Script;
var fs = require('fs');


fs.readFile('keys.json', function(err, data){
  var privateKeys = [];
  var publicKeys = [];
  var txId = 'd496ad5da0cded93c2b3a90ae6a8e3ef9e0bbe080bb768ce3d1b31fbc05ef831';
  var outputIndex = 1;
  var amount = 10.00000000; //in btc not satoshis
  var receiver_address = 'mtSceR1CCKbeQmvPWEBfH5DduykJZZBBBn';
  var requiredSignatures = 2;

  if(err) {
    return console.log(err.message);
  }

  var jsonArray = JSON.parse(data);
  for(i = 0; i < jsonArray.length; i++) {
    var privKey = PrivateKey.fromWIF(jsonArray[i]);
    privateKeys.push(privKey);
    publicKeys.push(privKey.toPublicKey());
  }

  console.log(publicKeys);

  var address = new Address(publicKeys, requiredSignatures); // 2 of 3

  var utxo = {
    "txId" : txId,
    "outputIndex" : outputIndex,
    "address" : address.toString(),
    "script" : new Script(address).toHex(),
    "amount" : amount
  };

  console.log(utxo);

  // because we are requiring 2 of 3 signatures. We are signing it
  // two times with 2 privateKeys
  var transaction = new Transaction()
      .from(utxo, publicKeys, requiredSignatures)
      .change(receiver_address)
      .sign(privateKeys[0])
      .sign(privateKeys[1])


  console.log(transaction.isFullySigned()); //it should be true

  console.log(transaction.serialize());
  // after that you can push the results with:
  // bitcoin-cli -testnet sendrawtransaction $RAW_TX

});

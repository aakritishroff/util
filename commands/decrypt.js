#!/usr/bin/env node

var fs        = require('fs');
var gitConfig = require('git-config');
var http      = require('http');
var forge     = require('node-forge');
var $rdf      = require('rdflib');

var BigInteger = forge.jsbn.BigInteger;
var sshprivkey = require('../sshprivkey.js');
var sshpubkey = require('../sshpubkey.js');

var domain = 'gitpay.org';
var config = gitConfig.sync();

/*
* decrypt gets response in turtle for a given user
*
* @param {String} argv[2] message
* @param {String} argv[3] key
* @callback {bin~cb} callback
**/
function decrypt(argv, callback) {

  var message = argv[2];
  if (!message) {
    console.log('message is required');
    process.exit(-1);
  }

  var key = argv[3];

  if (!key) {
    key = config.gitpay.privkey.replace(/['"]+/g, '');
  }

  if (!key) {
    console.log('key is required');
    process.exit(-1);
  }

  sshprivkey(key, function(err, priv) {
    if (err) {
      console.log(err);
    }
    //var d = priv.private.decrypt( forge.util.hexToBytes(enc) );
    var d = priv.private.decrypt( forge.util.decode64(message) );
    console.log(d);
  });

}


/*
* decrypt as a command
*
* @param {String} argv[2] login
* @callback {bin~cb} callback
**/
function bin(argv) {
  decrypt(argv, function(err, res) {
    console.log(res);
  });
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv);
}


module.exports = decrypt;

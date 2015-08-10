#!/usr/bin/env node

var fs        = require('fs');
var http      = require('http');
var gitConfig = require('git-config');
var $rdf      = require('rdflib');

var domain = 'gitpay.org';
var config = gitConfig.sync();

/*
* privkey gets response in turtle for a given user
*
* @param {String} argv[2] login
* @callback {bin~cb} callback
**/
function privkey(argv, callback) {

  if (config.gitpay.privkey) {
    console.log('your defualt private key is set to');
    console.log(config.gitpay.privkey);
    process.exit(0);
  }

  var id = argv[2];
  if (!id) {
    console.log('default private key URI is required');
    process.exit(-1);
  }

  console.log("Your gitpay private keys is not yet set. You can set it by typing:");
  console.log("git config --global gitpay.privkey " + id);

}


/*
* privkey as a command
*
* @param {String} argv[2] login
* @callback {bin~cb} callback
**/
function bin(argv) {
  privkey(argv, function(err, res) {
    for (var i=0; i<res.length; i++) {
      console.log(res[i].subject.value);
    }
  });
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv);
}


module.exports = privkey;

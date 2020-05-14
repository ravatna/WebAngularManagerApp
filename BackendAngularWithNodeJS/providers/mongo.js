'user strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://127.0.0.1:27017'; 
// Database Name
const dbName = 'WebAngularManagerApp';

// Use connect method to connect to the server
var connection = MongoClient.connect(url,{useNewUrlParser: true}, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to MonoDB Server 27017");
    const db = client.db(dbName);
});


module.exports = connection;
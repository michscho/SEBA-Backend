"use strict";

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test-user:P87NxEqEXs3TcIMR@sandbox-mmakc.mongodb.net/KnowMoreDB?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("KnowMoreDB").collection("UserProfile").find( {
        'nickname': 'nolimimer'
    }).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });;
});

module.exports = {
    uri,
    client
};
/**
 * Created by chengyong.lin on 18/1/18.
 */

'use strict';

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://localhost:27017/video';

MongoClient.connect(url, function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to server db", db);

    // Find some documents in our collection
    db.collection('movies').find({}).toArray(function(err, docs) {

        // Print the documents returned
        docs.forEach(function(doc) {
            console.log(doc.title);
        });

        // Close the DB
        db.close();
    });

    // Declare success
    console.log("Called find()");
});
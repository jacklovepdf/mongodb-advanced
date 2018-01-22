/**
 * Created by chengyong.lin on 18/1/22.
 */

'use strict';

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    constant =  require('../common/constant');

const dbName = 'video'; // db name

MongoClient.connect(constant.url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        insertDocuments(db, function() {
            client.close();
        });
    }
);

// const findDocuments = function(db, collection, callback) {
//     // Get the documents collection
//     const collection = db.collection('documents');
//     // Find some documents
//     collection.find({}).toArray(function(err, docs) {
//         assert.equal(err, null);
//         console.log("Found the following records");
//         console.log(docs)
//         callback(docs);
//     });
// }
//
// const updateDocument = function(db, collection, callback) {
//     // Get the documents collection
//     const collection = db.collection(collection);
//     // Update document where a is 2, set b equal to 1
//     collection.updateOne({ a : 2 }
//         , { $set: { b : 1 } }, function(err, result) {
//             assert.equal(err, null);
//             assert.equal(1, result.result.n);
//             console.log("Updated the document with the field a equal to 2");
//             callback(result);
//         });
// }
//
// const removeDocument = function(db, collection, callback) {
//     // Get the documents collection
//     const collection = db.collection(collection);
//     // Delete document where a is 3
//     collection.deleteOne({ a : 3 }, function(err, result) {
//         assert.equal(err, null);
//         assert.equal(1, result.result.n);
//         console.log("Removed the document with the field a equal to 3");
//         callback(result);
//     });
// }
//
// const indexCollection = function(db, callback) {
//     db.collection('documents').createIndex(
//         { "a": 1 },
//         null,
//         function(err, results) {
//             console.log(results);
//             callback();
//         }
//     );
// };

const insertDocuments = function(collection, callback) {
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};


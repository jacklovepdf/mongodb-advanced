/**
 * Created by chengyong.lin on 18/1/21.
 */

'use strict';

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    cons = require('consolidate'),
    express =  require('express'),
    path = require('path'),
    app = express();

// register the handlebars engine
app.engine('handlebars', cons.handlebars);
// set template engine
app.set('view engine', 'handlebars');
// template file des
app.set('views', path.join(__dirname, '../views'));

var url = 'mongodb://localhost:27017';  // mongodb server
var dbName = 'video'; // db name

MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);

        app.get('/', function (req, res) {
            // Find some documents in our collection
            db.collection('movies', ()=>{console.log("callback")}).find({}).toArray(function(err, docs) {
                res.render('movies', {'movies': docs});
            });
        });
        app.use(function (req, res) {
            res.sendStatus(404)
        });
        var server = app.listen(3000, function () {
            console.log("express server listening at port 3000")
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
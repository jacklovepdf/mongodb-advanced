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
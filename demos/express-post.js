/**
 * Created by chengyong.lin on 18/1/21.
 */

'use strict';

var assert = require('assert'),
    cons = require('consolidate'),
    express =  require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express();

// register the handlebars engine
app.engine('handlebars', cons.handlebars);
// set template engine
app.set('view engine', 'handlebars');
// template file des
app.set('views', path.join(__dirname, '../views'));


// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error-template', { error: err });
}

app.get('/', function (req, res, next) {
    res.render('fruit-picker', { 'fruits': ['apple', 'orange', 'banana', 'peach'] });
});

app.get('/favorite_fruit', function (req, res, next) {
    var favorite = req.body.fruit;
    if(typeof favorite === 'undefined'){
        next('Please choose a fruit!');
    }else {
        res.send("Your favorite fruit is " + favorite);
    }
});

app.use(errorHandler);

var server = app.listen(3000, function () {
    console.log("express server listening at port 3000")
});
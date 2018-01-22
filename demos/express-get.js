/**
 * Created by chengyong.lin on 18/1/21.
 */

'use strict';

var assert = require('assert'),
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


app.get('/:name', function (req, res, next) {
    var name =  req.params.name;
    var path =  req.path;
    var queryName1 = req.query.getvar1;
    var queryName2 = req.query.getvar2;
    res.render('express-get', { name : name, getvar1 : queryName1, getvar2 : queryName2, path: path });
});
app.use(function (req, res) {
    res.sendStatus(404)
});
var server = app.listen(3000, function () {
    console.log("express server listening at port 3000")
});
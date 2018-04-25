var express = require('express');

var fs = require('fs');
//var path = require('path');
var bodyParser = require('body-parser');

//var index = require('./routes/index');
//var task = require('./routes/tasks');

var port = 3000;

var app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('/', function(req, res) {
    res.render('index');
    })

var urlencodedParser = bodyParser.urlencoded({ extended: false })

//app.get('/config.json', urlencodedParser, function(req, res) {
//    res.send(elements_array);
//})

//app.get('/rgg', urlencodedParser, function(req, res) {
//    res.send(rgg);
//})

app.listen(port, function() {
    console.log('Server started on port ' + port);
})

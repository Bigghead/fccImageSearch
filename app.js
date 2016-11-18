var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    lookFor = require('bing.search'),
    app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index');
});

app.post('/imageSearch', function(req, res){
  var search = req.body.searchValue;
  console.log(search);
  res.send('Success');
});

app.listen('5000', function(){
  console.log('Listening on 5000');
});

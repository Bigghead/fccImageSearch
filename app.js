var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index');
});

app.post('/imageSearch', function(req, res){
  app.send('Success');
});

app.listen('5000', function(){
  console.log('Listening on 5000');
});

var express = require('express'),
    mongoose = require('mongoose'),
    app = express();

app.set('view engine', 'ejs');




app.listen('5000', function(){
  console.log('Listening on 5000');
});

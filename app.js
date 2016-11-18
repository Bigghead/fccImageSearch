var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Search = require('bing.search'),
    app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

lookFor = new Search('BHLEqTcoRS2pdlYKz8+2Ue1fkVDdMYcmnFjdMAkiec0=');

app.get('/', function(req, res){
  res.render('index');
});

app.post('/imageSearch', function(req, res){
  var search = req.body.searchValue;
  console.log(search);
  lookFor.images(search,
    {top: 5,
    image: 20400
    },
    function(err, results){
    if(err){
      console.log(err);
    } else {
      console.log(results);
      for(var i = 0 ; i < results.length; i ++){
        res.json({
          imageURL: results[i].url,
          altText : results[i].title,
          pageURL : results[i].sourceUrl
        });
      }
    }
  });
});

app.listen('5000', function(){
  console.log('Listening on 5000');
});

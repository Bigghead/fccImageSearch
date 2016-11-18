var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Search = require('bing.search'),
    app = express();

//mongo connection
mongoose.connect('mongodb://localhost/imageSearch');

var searchSchema = new mongoose.Schema({
  searchTerm : String,
  when : String
});

var images = mongoose.model('Image', searchSchema);

app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

lookFor = new Search('BHLEqTcoRS2pdlYKz8+2Ue1fkVDdMYcmnFjdMAkiec0=');

app.get('/', function(req, res){
  res.render('index');
});

app.post('/imageSearch', function(req, res){
  var search = req.body.searchValue;
  console.log(search);

  images.create({
    searchTerm : search,
    when : new Date()
  });

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

app.get('/imageSearch/latest', function(req, res){
  images.find({}, {'_id' : 0, '__v' : 0}).sort('-1').exec(function(err, results){
    if(err){
      console.log(err);
    } else{
      res.send(results);
    }
  });
});

app.listen('5000', function(){
  console.log('Listening on 5000');
});

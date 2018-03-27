var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

var heroes = [
  {id: 1, name: "Mr. A"}
]

var currentId = 1;

app.get('/hero', function (req, res) {
  console.log("List of hero:\n " + JSON.stringify(heroes));

  res.end(JSON.stringify(heroes));
})

app.post('/hero', function(req, res){
  console.log(req.body);      // your JSON

  var hero = req.body;
  hero.id = ++ currentId;

  heroes.push(hero);

  res.end();
});

app.delete('/hero/:id', function(req, res) {
  
  console.log("Deleting Hero: " + req.params.id);

  const heroId = req.params.id;

  let hero = heroes.filter(hero => {
    return hero.id == heroId;
  })[0];

  const heroInd = heroes.indexOf(hero);

  heroes.splice(heroInd, 1);

  res.end();
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
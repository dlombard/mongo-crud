var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var favicon = require('serve-favicon')
const baas = require("baas")
var routes = require("./server/routes")
var app = express()

const client = new baas.BaasClient('trymongo-red-kxrlp');
const db = client.service('mongodb', 'TryMongoDBService').db('trymongo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.ico')))
app.use(function (req, res, next) {
  req.client = client;
  req.db = db;
  next();
});
// send all requests to index.html so browserHistory in React Router works
app.use('/api', routes)
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var PORT = process.env.PORT || 8080
app.listen(PORT, function () {
  console.log('Production Express server running at localhost:' + PORT)
})
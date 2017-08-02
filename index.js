require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const routes = require("./server/routes")
const app = express()
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.ico')))

MongoClient.connect(process.env.MONGO_URI).then((db) => {

  app.use(function (req, res, next) {
    req.db = db;
    next();
  });
  // send all requests to index.html so browserHistory in React Router works
  app.use('/api', routes)
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  const PORT = process.env.PORT || 8080
  app.listen(PORT, function () {
    console.log('Production Express server running at localhost:' + PORT)
  })

}).catch((err) => {
  console.error(err)
})



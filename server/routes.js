var express = require('express');
var router = express.Router();

router.route('/all').get((req, res, next) => {
  var db = req.db;
  var client = req.client;
  client.anonymousAuth().then(() => {
    db.collection('trymongo').find({}).then(results => { res.send(JSON.stringify(results, null, 2)); });
  })
});

module.exports = router
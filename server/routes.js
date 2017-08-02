const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID

router.route('/all').get((req, res, next) => {
  const db = req.db;
  var client = req.client;
  client.anonymousAuth().then(() => {
    db.collection('trymongo').find({}).then(results => { res.send(JSON.stringify(results, null, 2)); });
  })
});

router.route('/')
  .post((req, res, next) => {
    const db = req.db;
    const body = req.body
    db.collection('mug').insert({ 'name': body.name, 'comment': body.comment }).then((result) => {
      res.send(result)
    }).catch((err) => {
      console.error(err)
    })
  })
  .patch((req, res, next) => {
    const db = req.db;
    const body = req.body
    const updateDoc = {}
    if (body.comment != '') {
      console.log(`Comment: ${body.comment}`)
      updateDoc.comment = body.comment
    }
    if (body.name != '') {
      updateDoc.name = body.name
    }
    console.log(updateDoc)
    db.collection('mug').findOneAndUpdate({ '_id': new ObjectID(body.id) }, { '$set': updateDoc }, { 'returnOriginal': false }).then((result) => {
      res.send(result)
    }).catch((err) => {
      console.error(err)
    })
  })
  .delete((req, res, next) => {
    const db = req.db;
    const id = req.body.id
    db.collection('mug').deleteOne({ '_id': new ObjectID(id) }).then((result) => {
      res.send(result)
    }).catch((err) => {
      console.error(err)
    })
  })

router.route('/:name')
  .get((req, res, next) => {
    const db = req.db;
    const name = req.params.name
    db.collection('mug').find({ 'name': name }).toArray().then((results) => {
      res.send(results)
    }).catch((err) => {
      console.error(err)
    })
  })

module.exports = router
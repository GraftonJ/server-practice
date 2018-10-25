const express = require('express');
const router = express.Router();
const knex = require('../knex')

// Read ALL

router.get('/', (req, res, next) => {
  knex('messages')
    .select('id', 'message', 'name')
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id', (req, res, next) => {
  knex('messages')
    .select('id', 'message', 'name')
    .where('id', req.params.id)
    .then((rows) => {
      res.send(rows[0])
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/', (req, res, next) => {
  knex('messages')
    .insert({
      "name": req.body.name,
      "message": req.body.message
    })
    .returning(['id', 'name', 'message'])
    .then((data) => {
      res.json(data[0])
    })
    .catch((err) => {
      next(err)
    })
})

router.patch('/:id', (req, res, next) => {
  knex('messages')
    .where('id', req.params.id)
    .then((data) => {
      knex('messages')
        .where('id', req.params.id)
        .limit(1)
        .update({
          'name': req.body.name,
          'message': req.body.message
        })
        .returning(['id', 'name', 'message'])
        .then((data) => {
          res.json(data[0])
        })
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/:id', function(req, res, next) {
  knex('messages')
  .where('id', req.params.id)
  .first()
  .then((row) => {
    if(!row) return next()
    knex('messages')
      .del()
      .where('id', req.params.id)
      .returning(['id', 'name', 'message'])
      .then((data) => {
        res.send(data[0])
        })
      })
    .catch((err) => {
      next(err)
    })
  })

module.exports = router;

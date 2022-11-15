const express = require('express')
const router = express.Router()


router.get('/', (req, res, next) => {
      res.send('1. By Name\n2. By Keywords\n3. By Tags\n4. By Synonym Words')
})



router.get('/name', (req, res, next) => [
      res.send('Soon you will have a form here for search. Just wait....')
])

module.exports = router
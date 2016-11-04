'use strict'

const PORT = process.env.PORT || 3000

const _ = require('lodash')
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()

app.use(bodyParser.json())

app.post('/%F0%9F%8E%85', (req, res) => {
  const santas = _.shuffle(req.body.santas)
  const recievers = santas.slice()

  recievers.unshift(recievers.pop())

  const result = _.transform(santas, (result, santa, index) => {
    result[santa] = recievers[index]
  }, {})

  res.send(result)
})

app.post('/index.html', function (req, res, next) {
  req.method = 'GET'
  next()
})

app.use(express.static(path.resolve(process.cwd(), 'build')))

app.listen(PORT, () => console.log('Server started', PORT))

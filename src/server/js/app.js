'use strict'

const PORT = process.env.PORT || 3000

const _ = require('lodash')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()

app.use(express.static('build'))
app.use(bodyParser.json())

app.post('/xn--8j8h', (req, res) => {
  const santas = _.shuffle(req.body.santas)
  const recievers = santas.slice()

  recievers.unshift(recievers.pop())

  const result = _.transform(santas, (result, santa, index) => {
    result[santa] = recievers[index]
  }, {})

  res.send(result)
})

app.listen(PORT, () => console.log('Server started', PORT))

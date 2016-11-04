'use strict'

const PORT = process.env.PORT || 3000

const _ = require('lodash')
const FB = require('fb')
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()

const fb = new FB.Facebook(options);

app.use(express.static(path.resolve(process.cwd(), 'build')))
app.use(bodyParser.json())

app.post('/login', (req, res) => {
	
})

app.post('/%F0%9F%8E%85', (req, res) => {
  const santas = _.shuffle(req.body.santas)
  const recievers = santas.slice()

  recievers.unshift(recievers.pop())

  const result = _.transform(santas, (result, santa, index) => {
    result[santa] = recievers[index]
  }, {})

  res.send(result)
})

app.listen(PORT, () => console.log('Server started', PORT))

// jshint asi:true

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.send('Welcome back!')
})

app.listen(3000, () => {
  console.log('App is listening on port 3000')
})
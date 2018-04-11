// jshint asi:true

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')

// Using an absolute path is safer
app.use(express.static(`${__dirname}/public`));

app.get('/form-get', (req, res) => {

  // res.render('index')
})

app.get('/form-post', (req, res) => {

  // res.render('index')
})

app.all('/form-submit', (req, res) =>{
  res.json({message: 'The button is working!'})
})

app.listen(3000, () => {
  console.log('App is listening on port 3000')
})
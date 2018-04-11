// jshint asi:true

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

// Using an absolute path is safer
app.use(express.static(`${__dirname}/public`));

app.all('/form-submit', (req, res) =>{
  res.json({
    queryParams: req.query,
    bodyParams: req.body
  })
})

app.get('/:uri', (req, res) => {
  const method = req.params.uri.split('-')[1]
  if (method == 'get' || method == 'post') {
    res.render('forms', {method: method, root: __dirname})
  } else {
   res.send('It is form-get or form-post please')
  }
})

app.listen(3000, () => {
  console.log('App is listening on port 3000')
})
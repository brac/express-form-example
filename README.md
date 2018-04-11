# POSTing form data with Express

## Goal
Build a basic web app using Express which can send data to the server via an HTML `<form>` element. You will be required to create two simple pages on the app. The mockups are provided below (notice that while the forms are nearly identical, they have two distinct differences, the URL, and the method attached to the form). When this is completed you should be able to navigate to both URLs and see the same form, but the form at the URL `'/form-get'` should use a `GET` method, while the form that is rendered at the URL `'/form-post'` should use a `POST` method. You could achieve this by creating two seperate views, or for an extra challenge, create one view, that depending on which URL you navigate to, dynamically sets the method of the form as appropriate.

#### Form Get Page
The `action` property of the form should be set to `/submit-form`

#### Form Post Page
The `action` property of the form should be set to `/submit-form`

#### Server Routes

The server should have the following routes:
1. A route to render the `/form-get` page
    - url: `/form-get`
    - http method: `GET`
    - response: renders the `<form>` with method set to `GET`, and `action` set to `/submit-form`.
1. A route to render the `/form-post` page
    - url: `/form-post`
    - http method: `GET`
    - response: renders the `<form>` with method set to `POST`,  and `action` set to `/submit-form`
1. A route which handles the form submissions
    - url: `/submit-form`
    - http method: `ANY`
    - response: returns a JSON response of the request's body params and the request's query params
    - example response: `{"body-params": {"artist": "bonobo", "country": "uk"}, "query-params": {}}`

#### Trevor's Process

npm init
npm install express
npm install body-parser
index.js
  Express
  app.use(bodyParser.urlencoded({extended : true}))
  app.get('/form-get')
    res.sendFile('form-get.html', {root: ```__dirname```})
  app.get('/form-post')
    res.sendFile('form-post.html', {root: ```__dirname```})
  app.all('/form-submit')
    res.json({
    bodyParams: req.body
    queryParams: req.query
  })

  app.listen()

form-get.html
  body
    h1 title
    form method GET action=/form-subit
      input artist_name
      input country
      input submit

form-post.html
  body
    h1 title
    form method POST action=/form-submit  //You could add query params:
      input artist_name
      input country
      input submit
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


### Review
I started by getting the server up and running, as always, so I had something to build on. Once I had the basic routes going (I would refactor to a single route later) I needed to get ejs and the web pages up.

This took a little more time that I had hoped, as my CSS and HTML are a bit rusty, but eventually I got a matching interface that didn't break with the window being resized.

While I was writing the pages I also configured and named the forms, text fields and submit buttons. Remember I was writting pagse for both ```/form-post``` and ```/form-get```.

So ```form-post.ejs``` uses a ```post``` method and ```form-get.ejs``` uses a ```get``` method. Otherwise the pages are identical.

So back in ```app.js``` I was ready to start rendering these pages. Simple enough, just mathcing a ```.get``` request to the coorsponding route, I ```res.render()``` the coorosponding view. These views access the same header and footer, an exercise for myself more than anything else.

Ok so now that the pages were being displayed it was time to start getting the data from either ```req.body``` or ```req.query```, which in turn was provided by ```form-post``` or ```form-get``` respectivetly.

To do that we just had to write our ```/form-submit``` route. This is the route that our submit button will tigger on the forms, and this route is a ```app.all()``` route so it will take any kind of method requested. In this case, get and post.

In that route we just responded with a json object the query params and the body params. Depending on which form the user submitted on, we would see the data in the coorosponding area. Post goes to body, get goes to query.

Lastly I refactored the two routes, ```/form-get``` and ```/form-post``` into a single route, ```/:uri```. I then tested ```req.params.uri``` against ```/form-get``` and ```/form-post``` to decide on which page to render. In order to ensure that the ```/form-submit``` still triggered in time I moved that route above this ```/:uri``` catch all.

I suppose it may have been possible to have a single page and only change the method and the text in the .ejs file. I'm not sure how to pass that kind of information to an .ejs render, or rather I don't know how to catch it on the ejs file side. hmmmmm......

Ok so I figured it out. I just had to pass an object with the key values pairs of the values that I wanted to call in my .ejs file. So I created a single ```forms.ejs``` file and changed the title and method to a .ejs variable that I passed in from the route. This also meant that I could shorten my route call, now that I had a single if statment that would ensure that the user is trying to access ```/form-get``` or ```/form-post```. I spliced off whatever came after '-' and passed that to my .ejs file. Boom bang bing, single view, multiple pages, multiple methods, all data accessible.



































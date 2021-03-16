Node’s HTTP server uses a single request handler function for all requests. Express provides routing by breaking the application into different request handlers for each URL and HTTP method combination.

# How routing works in an express application

Routing maps incoming requests to appropriate request handlers based on the URL and HTTP methods.
* We can have a single URL per resource and execute different code based on the HTTP Method/Verb used.
* Building Web APIs to perform CRUD operations on resources is straight forward because there are HTTP Methods that map directly to each operation.

To make our Express application respond to `GET` requests on different URLs add the following endpoints:

### Request handler executes when making a `GET` request to `/about`
```javascript
server.get('/about', (req, res) => {
  res.status(200).send('<h1>About Us</h1>');
});
```

### Request handler executes when making a `GET` request to `/contact`
```javascript
server.get('/contact', (req, res) => {
  res.status(200).send('<h1>Contact Form</h1>');
});
```

* We are using the same HTTP Method on both endpoints
* Express looks at the URL and executes the corresponding request handler
* We can return a string with valid HTTP

Open a browser and navigate to the `/about` and `/contact` routes. The appropriate route handler will execute. Endpoints execute different request handlers on the same URL by changing the HTTP method used. Add the following code after the `GET` endpoint to `/hobbits`:

### Request handler executes when making a `POST` request to `/hobbits`
```javascript
server.post('/hobbits', (req, res) => {
  res.status(201).json({ url: '/hobbits', operation: 'POST' });
});
```

HTTP status code 201 (created) is returned for successful `POST` operations. Add an endpoint for `PUT` requests to the same URL.

### Request handler executes when making a `PUT` request to `/hobbits`
```javascript
server.put('/hobbits', (req, res) => {
  res.status(200).json({ url: '/hobbits', operation: 'PUT' });
});
```

HTTP Status Code 200 (OK) is used for successful `PUT` operations. Add an endpoint to handle `DELETE` requests.

### Request handler executes when making a `DELETE` request to `/hobbits`
```javascript
server.delete('/hobbits', (req, res) => {
  res.status(204);
});
```

This returns HTTP Status Code 204 (No Content). If you are returning any data to the client (like the removed resource on successful deletes) you’d change that to 200.

# Read data from the query string, request body, and route parameters

Web APIs usually require data from clients which can be:
* Route parameters
* Key/value pairs inside the query string
* The request body

## Reading and Using Route Parameters

The client lets the API know which hobbit should be deleted or updated with route parameters.
* Route parameters are added to the URL with a colon (`:`) in front
* Express adds it to the `.params` property part of the request object

We'll add route parameters to our `DELETE` endpoint:

```javascript
server.delete('/hobbits/:id', (req, res) => {
  const id = req.params.id;
  // or we could destructure it like so: const { id } = req.params;
  res.status(200).json({
    url: `/hobbits/${id}`,
    operation: `DELETE for hobbit with id ${id}`,
  });
});
```

This route handler will execute every `DELETE` for a URL that begins with `/hobbits/` followed by any value.
* `DELETE` requests to `/hobbits/123` and `/hobbits/frodo` will both trigger this request handler
* The value passed after `/hobbits/` will end up as the `id` property on `req.params`
* The value for a route parameter will always be `string`, even if the value passed is numeric; when hitting `/hobbits/123` the type of `req.params.id` will be `string`

Express routing has support for multiple route parameters. Defining a route URL that reads `/hobbits/:id/friends/:friendId` will add properties for `id` and `friendId` to `req.params`.

## Using the Query String

The query string also uses the URL to pass information from clients to the server.
* It is structured as a set of key/value pairs.
* Each pair takes the form of `key=value` and pairs are separated by an `&`.
* We add `?` and the end of the URL followed by the set of key/value pairs to mark the beginning of the query string.

An example of a query string would be: `https://www.google.com/search?q=lambda&tbo=1`
* The query string portion is `?q=lambda&tbo=1`
* The key/value pairs are `q=lambda` and `tbo=1`
* To add sorting capabilities we’ll provide a way for clients to hit our `/hobbits` and pass the field they want to use to sort the responses. Our API will sort the data by that field in ascending order.

Here’s the new code for the `GET` `/hobbits` endpoint:

```javascript
server.get('/hobbits', (req, res) => {
  // query string parameters are added to req.query
  const sortField = req.query.sortby || 'id';
  const hobbits = [
    {
      id: 1,
      name: 'Samwise Gamgee',
    },
    {
      id: 2,
      name: 'Frodo Baggins',
    },
  ];

  // apply sorting
  const response = hobbits.sort(
    (a, b) => (a[sortField] < b[sortField] ? -1 : 1)
  );

  res.status(200).json(response);
});
```

* Enter `localhost:8000/hobbits?sortby=name` and the list is sorted by `name`.
* Enter `localhost:8000/hobbits?sortby=id` and the list will be sorted by `id`. If no `sortby` parameter is provided, it should default to sorting by `id`.

To read values from the query string, we use the `req.query` object added by Express. There will be a key and a value in the `req.query` object for each key/value pair found in the query string.

The value of the parameter will be of type `array` if more than one value is passed for the same key and `string` when only one value is passed. This means that in the query string `?id=123`, `req.query.id` will be a string, but for `?id=123&id=234` it will be an array.

Another gotcha is that the names of query string parameters are case sensitive, `sortby` and `sortBy` are two different parameters.

The rest of the code sorts the array before sending it back to the client.

## Reading Data from the Request Body

We begin by taking another look at the `POST` `/hobbits` endpoint. We need to read the hobbit’s information to be able to add it to the hobbits array. Add this code right after `const server = express();`:

```javascript
server.use(express.json());

let hobbits = [
  {
    id: 1,
    name: 'Bilbo Baggins',
    age: 111,
  },
  {
    id: 2,
    name: 'Frodo Baggins',
    age: 33,
  },
];

let nextId = 3;
```

### Modify post endpoint
```javascript
server.post('/hobbits', (req, res) => {
  const hobbit = req.body;
  hobbit.id = nextId++;

  hobbits.push(hobbit);

  res.status(201).json(hobbits);
});
```

To make this work with the hobbits array, we first move it out of the get endpoint into the outer scope. Now we have access to it from all route handlers.
* We define a variable for manual id generation
* When using a database, this is not necessary as the database management system generates ids automatically

To read data from the request body we need to:
* Add the line: `server.use(express.json());` after the express application has been created.
* Read the data from the body property that Express adds to the request object. Express takes all the information that the client added to the body and makes it available as a nice JavaScript object.

Let’s test it using Postman:
* Change the method to POST.
* Select the `Body` tab underneath the address bar.
* Click on the `raw` radio button.
* From the dropdown menu to the right of the `binary` radio button, select `JSON` (appplication/json).

Add the following JSON object as the body:

```javascript
{
  "name": "Samwise Gamgee",
  "age": 30
}
```

Click on `Send`, and the API should return the list of hobbits, including Sam!

## Implement Update Functionality

Let’s continue practicing reading route parameters and information from the request body. Let’s take a look at our existing PUT endpoint:

```javascript
server.put('/hobbits', (req, res) => {
  res.status(200).json({ url: '/hobbits', operation: 'PUT' });
});
```

We start by adding support for a route parameter the clients can use to specify the id of the hobbit they intend to update:

```javascript
server.put('/hobbits/:id', (req, res) => {
  res.status(200).json({ url: '/hobbits', operation: 'PUT' });
});
```

Next, we read the hobbit information from the request body using `req.body` and use it to update the existing hobbit.

```javascript
server.put('/hobbits/:id', (req, res) => {
  const hobbit = hobbits.find(h => h.id == req.params.id);

  if (!hobbit) {
    res.status(404).json({ message: 'Hobbit does not exist' });
  } else {
    // modify the existing hobbit
    Object.assign(hobbit, req.body);

    res.status(200).json(hobbit);
  }
});
```

# Basics of the REST architectural style

REpresentational State Transfer (REST) is set of principles introduced [in 1999 by Roy Fielding](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) that define a way to design distributed software. REST is a generally agreed-upon set of principles and constraints. They are recommendations, not standards.

When designing a RESTful Web API:
* Everything is a resource
* Each resource is accessible via a unique URI
* Resources can have multiple representations
* Communication happens over a stateless protocol (HTTP)
* Resource management happens via HTTP methods

By applying the REST architecture to our APIs, we can make them scalable and simpler to maintain and extend. REST APIs have six constraints:

#### Client-server Architecture

#### Stateless Architecture
* Each request should stand on its own
* Order should not matter
* No shared state

#### Cacheable
* Improves network performance
* `GET`, `PUT`, and `DELETE` should be idempotent meaning the same command executed multiple times gives the same result like a pure function.
* `POST` is not idempotent.
* Caching is a way to store and retrieve data so that future requests can be fulfilled faster without repeating expensive calculations or operations.

#### Layered System
* Component A (a client) might or might not communicate directly with Component B (the server)
* There may be other layers between them like:
  * logging
  * caching
  * DNS servers
  * load balancers
  * authentication
  
#### Code on Demand
* The API returns the resource and code to act on it
* The client only needs to know how to execute the code
* Makes the API more flexible, upgradable and extendible
* Most web application, send JavaScript code along with the data
  
#### Uniform Interfaces
* Each resource should be accesible through a single URL
* We should be able to manage the resources through the URL representations
* Every interaction with the resource should happen through the URL identifier we gave to it
* Messages should be self-descriptive

### HATEOAS (Hyepermedia As The Engine Of Application State)
Much like a choose your own adventure book the pages are not read in order. You start at page 1, and based on the information available, the reader (client) chooses the action to take, moving them to a different page. A good example of a hypermedia API is [the GitHub API](https://api.github.com/).

# Use Express Routers to organize Web API code

As an application grows the number of resources and routes will increase and add complexity to our Web API. Express Routers provide a way to split an application into modular sub-applications that are easier to maintain and reason about.

An Express Router behaves like a mini Express application. It can have it’s own Routing and Middleware, but it needs to exist inside of an Express application. Routers organize Express applications with separate pieces that can later be composed together. We’ll start with our main server file:

```javascript
const express = require('express');

const server = express();

server.use('/', (req, res) => res.send('API up and running!'));

server.listen(8000, () => console.log('API running on port 8000'));
```

We wouldn’t need routers if our applications looked like this, but imagine that this application needs endpoints to:
* see a list of users
* get details for a single user
* add users
* modify existing users
* delete inactivate users

That is at least 5 endpoints for the `users` resource. Now imagine this application also needs to deal with:
* products
* orders
* returns
* categories
* providers
* warehouses
* clients
* employees

Even if we only have 5 endpoints per resource, each endpoint will have many lines of code. Let’s rewrite it to separate the main server file from the file handling the routes for users. Create a file to handle all routes related to the user resource:

```javascript
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('hello from the GET /users endpoint');
});

router.get('/:id', (req, res) => {
  res.status(200).send('hello from the GET /users/:id endpoint');
});

router.post('/', (req, res) => {
  res.status(200).send('hello from the POST /users endpoint');
});

module.exports = router;
```

Since this file will only be used when the route begins with "/users" we can remove that from the URLs. "/users" becomes simply "/".

In our main file enter:

```javascript
const express = require('express');

const userRoutes = require('./users/userRoutes');
const productRoutes = require('./products/productRoutes');
const clientRoutes = require('./clients/clientRoutes');

const server = express();

server.use('/users', userRoutes);
server.use('/products', productRoutes);
server.use('/clients', clientRoutes);

server.listen(8000, () => console.log('API running on port 8000'));
```

It is possible to have a central router that represents our API and have that router import the routes. This logic cleans up our main server file even more.

```javascript
const express = require('express');

const apiRoutes = require('./api/apiRoutes');

const server = express();

server.use('/api', userRoutes);

server.listen(8000, () => console.log('API running on port 8000'));
```

The `apiRoutes` could look like this:

```javascript
const express = require('express');

const userRoutes = require('./users/userRoutes');
const productRoutes = require('./products/productRoutes');
const clientRoutes = require('./clients/clientRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/clients', clientRoutes);

module.exports = router;
```

Since this file will only be used when the route begins with "/api" we can remove that from the URLs. "/api/users" becomes simply "/users".

Routers can use other routers. The `userRoutes`, `productRoutes` and `clientRoutes` remain unchanged (other than relocating them inside the API folder). Let’s implement an API that returns strings with Express Routers:

1. Create an empty folder for our Web API named anything you’d like.
2. CD into the folder and type `npm init -y` to generate a default `package.json` file. The `-y` flag saves time by answering `yes` to all the questions that the `npm init` command would ask one at a time.
3. Open the folder in a text editor.
4. Inside the `package.json` file, change `"test": "echo \"Error: no test specified\" && exit 1"` inside the `scripts` object to read: `"start": "nodemon index.js"`. This will let us run our server using `nodemon` by typing `npm start` at the command line/terminal.
5. To install `nodemon` as a development time dependency type `npm install -D nodemon`. This will add it to the `devDependencies` property in our `package.json` file.
6. Create a file to host the server code called `index.js`.
7. Create our Express server with a default `/` endpoint to test that our server is responding to requests.

```javascript
const express = require('express');

const server = express();

server.use('/', (req, res) => res.send('API up and running!'));

// using port 9000 for this example
server.listen(9000, () => console.log('API running on port 9000'));
```

* Add the `express` npm module: `npm install express`
* Start the server by typing `npm start`
* Test it by visiting `http://localhost:9000`

Let’s add our first router to manage the `races` resource.
* Create a folder called `races` to host our router
* Create a file called `raceRoutes.js` and add the following code:

```javascript
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const races = ['human', 'elf', 'hobbit', 'wizard', 'dwarf', 'orc'];

  res.status(200).json(races);
});

module.exports = router;
```

Now open your `index.js` file and use the newly created router:
* require the `raceRoutes.js` file after requiring Express
* use the race router to handle the `/races` endpoint

Our `index.js` file now looks like this:

```javascript
const express = require('express');

const raceRoutes = require('./races/raceRoutes');

const server = express();

server.use('/races', raceRoutes);

server.use('/', (req, res) => res.send('API up and running!'));

server.listen(9000, () => console.log('API running on port 9000'));
```

Visiting `http://localhost:9000/races` should return our array of strings.

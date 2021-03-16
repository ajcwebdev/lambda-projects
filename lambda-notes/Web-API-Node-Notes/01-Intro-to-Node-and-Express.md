# Node.js and its core features

Node is used to write server code, specifically web services that can communicate with clients using the `JSON` (JavaScript Object Notation) format for data interchange. To write a simple web server with Node.js:

1. Use Node’s `HTTP` module to abstract away complex network-related operations
2. Write the single request handler function that will handle all requests to the server

The request handler is a function that takes the `request` coming from the client and produces the `response`. The function takes two arguments:
1. Object representing `request`
2. Object representing `response`

We use a single request handler function for all requests. Let’s write a web server that returns a message using only Node.js. Create a folder with `index.js` inside:

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World from Node\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Navigate to the folder and in a terminal type `node index.js` to execute the file. The message “Server running at `http://127.0.0.1:3000`” should be displayed, and the server is now waiting for connections. Open a browser and visit: `http://localhost:3000`.

# Express and its core features

### Middleware
Middleware functions can get the request and response objects, operate on them, and (when specified) trigger some action. Examples are logging or security. Express’ middleware stack is basically an array of functions. Middleware CAN change the request or response but it doesn’t have to.

### Routing
Routing is a way to select which request handler function is executed. It does so based on the URL visited and the HTTP method used. Routing provides a way to break an application into smaller parts. Applications can be broken up into `routers`. We could have a router to serve our SPA and another router for our API. Each router can have its own middleware and routing. This combination provides improved functionality.

### Convenience Helpers
Express has many helpers that provide out of the box functionality to make writing web applications and API servers easier. A lot of those helpers are extension methods added to the request and response objects. Examples from the Api Reference include:
* `response.redirect()`
* `response.status()`
* `response.send()`
* `request.ip`

### Views
Views provide a way to dynamically render HTML on the server and even generate it using other languages.

## Express Server

Let’s write our first server using Express.
1. Create a new file called `server.js` to host our server code
2. Type `npm init -y` to generate a `package.json`
3. Install the `express` npm module using: `npm install express`
4. Inside `server.js` add the following code

```javascript
const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send('Hello from Express');
});

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);
```

Run the server by typing: `node server.js` and visit `http://localhost:5000` in the browser. To stop the server type `ctrl + c` in the terminal.

# Create an API that can respond to GET requests

Lets build a simple Web API that returns the string “Hello World” on every incoming `GET` request. The program should return the string every time a request comes into the root route (`/`).

1. Clone node-express-mini repository to a folder on our computer
2. `cd` into folder 
3. Use `npm install` to download dependencies
4. Add `index.js` at the root of the folder next to `package.json`
5. Open `index.js` with code editor
6. Add the following code

```javascript
const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(8000, () => console.log('API running on port 8000'));
```

* Add express to `package.json` with `npm install express`.
* Enter `npm run server` to run the API.
* Open a web browser and navigate to `http://localhost:8000`.

`express()` is an instance of an Express application that we can use to configure our server and start listening for and responding to requests.

We are using the `.get()` method to set up a route handler function that will run on every `GET` request. As a part of this handler function we specify the URL which will trigger the request. In this case, the URL is the root of the site (represented by a `/`). There are also methods to handle:
* `POST`
* `PUT`
* `DELETE`

The first two arguments passed by `express` to a route handler function are:
1. Object representing `request`
2. Object representing `response`

The `.send()` method of the response object specifies the data sent to the client as the response body. The first two arguments are commonly called `req` and `res`. To turn the server on after configuration use the `.listen()` method to monitor a port for any incoming connections and respond to those we have configured. Our server will only send a response to `GET` requests made to the `/` route on port `8000`.

Let’s try returning JSON instead of just a simple string. Copy and paste the content of `index.js`. Then run your API through a browser to make sure it works. Now code a new endpoint that returns an array of movie characters in JSON format. The first step is to define a new route handler to respond to `GET` requests at the `/hobbits` endpoint.

```javascript
server.get('/hobbits', (req, res) => {
  // route handler code here
});
```

Next, we define the return data that our endpoint will send back to the client. We do this inside the newly defined route handler function.

```javascript
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
```

Now we can return the `hobbits` array. We could use `.send(hobbits)` like we did for the string on the `/` endpoint, but this time we’ll learn about two other useful methods we find in the response object.

```javascript
res.status(200).json(hobbits);
```

The client is trying to get a list of a particular `resource`, a list of `hobbits`. A `200 OK` status code communicates that the operation was successful. The `.status()` method of the response object can send any valid HTTP status code. We are also chaining the `.json()` method of the response object to communicate that we intend to send the data in JSON format.

```javascript
const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/hobbits', (req, res) => {
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

  res.status(200).json(hobbits);
});

server.listen(8000, () => console.log('API running on port 8000'));
```

Now we can visit `http://localhost:8000/hobbits` in our browser, and we should get back our JSON array.

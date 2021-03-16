# Different Types of Middleware

Most Express code we write (including route handlers) is middleware under the hood. We can think of middleware as an array of functions that get executed in the order they are introduced into the server code.

Express middleware is compatible with `connect` middleware. `Connect` is a web application framework for Node.js that only provides the middleware layer. Since `connect` has been around for longer, it has a rich ecosystem of modules and we can take advantage of that. There are different types of middleware including:
* Built-in middleware
* Third-party middleware
* Custom middleware

Built-in middleware is included with Express, but not added to the application automatically. Like the other types, we need to opt-in to using it in our application. We saw an example of built-in middleware when we added support for parsing JSON content out of the request body using `server.use(express.json());`.

We tell Express about the middleware we want to turn on for our application by making a call to `.use()` on our server and passing `.use()` the piece of middleware we want to apply. This line must come after the server has been created by calling `express()`.

Third-party middleware are npm modules we can install and import using `require()`.

Some popular middleware modules are:
* morgan
* cors
* helmet

Add morgan to solution, require it `const logger = require('morgan');`.
Add a new `server.use(logger('short))` before our other use. Show console.
Custom middleware are functions we write to perform certain tasks.

Route handlers are middleware. In our current implementation, if a client visits a non-existent endpoint, they will get a default message when a resource is not found on the server. In the case of a browser, its Cannot Get /urlWeTriedToAccess. This is a poor user experience. Please code along as we write a request handler that responds with a custom message for invalid URLs.

```javascript
function(req, res) {
  res.status(404).send("Ain't nobody got time for that!");
};
```

Now let’s just use it as if it was middleware:

```javascript
server.use(function(req, res) {
  res.status(404).send("Ain't nobody got time for that!");
});
```

Last step is adding this status after each route handler. If the preceding middleware or route handlers do not respond to the request then this will become our catch-all and respond with the correct HTTP status code and a helpful message. Requests to a non-existent endpoints will result in better experience for our clients.

# Write custom middleware

The two types of custom middleware that we’ll call are:
* Regular middleware
* Error handling middleware

Writing custom middleware is a two-step process:
1. Write a function that will receive three or four arguments
2. Add it to the middleware queue

We’ll write middleware that logs information about every request that comes into our server. We’ll be displaying the information in the console window to keep things simple.

```javascript
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}
```

We can see that a middleware function takes three parameters:
* `request`
* `response`
* `next`: A third parameter that is a function that points to the next middleware in the queue

Any middleware in the queue CAN modify both the request and response objects, but it’s NOT required. In this case, we are not making changes to either. Any middleware in the queue can stop the request and send a response back to the client. When that happens, the rest of the middleware, including the route handlers, will not work. We’ll see an example of this in the code-along section.

Calling `next()` signals to Express that the middleware has finished, and it should call the next middleware function. If `next()` is not called and a response is not sent back to the client, the request will hang, and clients will get a timeout error, so make sure to always call `next()` or use one of the methods that send a response back like `res.send()` or `res.json()`.

After `server.use(express.json());` add the following line.

```javascript
server.use(logger);
```

Hitting any of our endpoints will display some information about the request in the console. Any middleware in the queue can stop the request and send a response back to the client. When that happens, the rest of the middleware, including the route handlers, will not be executed. Let’s see this in action by writing our very own authentication middleware, but first, a bit of a story (any similarity to an actual story is a pure coincidence).

Imagine you’re next to a lake where a dangerous creature dwells, and it is moving towards you with ill intentions. Luckily, next to you is a sealed door that leads to safety, unfortunately, to open the door you need to provide the right password. Start by defining a function that shows our current predicament at the console as the application loads.

```javascript
function atGate(req, res, next) {
  console.log('At the gate, about to be eaten`);

  next();
}
```

Then add it as the first middleware in the queue.

```javascript
server.use(atGate);
```

This is what’s called global or application-wide middleware. It applies to every endpoint in our server. Accessing any route in our server should display the message on the console. Let’s add the authentication middleware that only grants access if we hit the correct route.

```javascript
function auth(req, res, next) {
  if (req.url === '/mellon') {
    next();
  } else {
    res.send('You shall not pass!');
  }
}
```

Now let’s add a route handler that leads to safety:

```javascript
server.get('/mellon', auth, (req, res) => {
  console.log('Gate opening...');
  console.log('Inside and safe');
  res.send('Welcome Traveler!');
});
```

What’s new here is that we are adding our middleware as the second parameter and the route handler as the third. Using middleware this way is what we call local middleware or route middleware. It just means we are using middleware locally and only applies to the endpoint where it’s added.

# Write error handling middleware

We have seen and worked with regular middleware. It is the middleware used when the application is working normally, but what happens when there is an error? That’s when error handling middleware comes into action and all regular middleware is turned off.

When our application encounters an error in the middle of executing middleware (remember route handlers are also middleware) code, we can choose to hand over control to error handling middleware by calling `next()` with one argument. It is an unspoken convention to make that argument be an error object like this: `next(new Error("error message"))`.

This type of middleware takes four arguments:
* `error`
* `req`
* `res`
* `next`

We pass the first argument when calling `next(new Error('error message here'))`. When the error handling code is finished, we can choose to end the request or call next without arguments to continue to the next regular middleware.

Error handling middleware CAN be placed anywhere in the stack, but it makes the most sense to place it at the end. If the intention is for middleware to handle errors that may occur elsewhere in the queue, then it needs to run after the rest of the middleware has run.

Let’s see this error-handling middleware in code. First, let’s write an endpoint that sends a file to the client in response to a `GET` request to the `/download` endpoint.

```javascript
const express = require('express');
const path = require('path');

const server = express();

server.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath);
});

server.listen(5000);
```

If we run our server and make a `GET` request to `/download`, the server will crash since there is no `index.html` file to send. We need to rewrite our endpoint and take advantage of the fact that `res.sendFile` supports passing a callback function as a second argument. This callback function will run after the file is sent, or if there is an error in the process of sending the file.

```javascript
// note we added the third parameter here: next
server.get('/download', (req, res, next) => {
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath, err => {
    // if there is an error the callback function will get an error as it's first argument
    if (err) {
      // we could handle the error here or pass it down to error-handling middleware like so:
      next(err); // call the next error-handling middleware in the queue
    } else {
      console.log('File sent successfully');
    }
  });
});
```

Now let’s go add error-handling middleware to our server. We can create the middleware function and then `use` it like any other middleware, or we can do it inline. Below an example of `using` it inline.

```javascript
server.use((err, req, res, next) => {
  console.error(err);

  res
    .status(500)
    .json({ message: 'There was an error performing the required operation' });
});
```

This middleware will only get called if any other middleware or route handler that comes before it has called `next()` with an argument like in the `/download` endpoint above. The complete code for our server now look like so:

```javascript
const express = require('express');
const path = require('path');

const server = express();

server.get('/download', (req, res, next) => {
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath, err => {
    // if there is an error the callback function will get an error as it's first argument
    if (err) {
      // we could handle the error here or pass it down to error-handling middleware like so:
      next(err); // call the next error-handling middleware in the queue
    } else {
      console.log('File sent successfully');
    }
  });
});

server.use((err, req, res, next) => {
  console.error(err);

  res
    .status(500)
    .json({ message: 'There was an error performing the required operation' });
});

server.listen(5000);
```

Open your browser and visit `http://localhost:5000/download`, and the error message coming from our error-handling middleware should display.

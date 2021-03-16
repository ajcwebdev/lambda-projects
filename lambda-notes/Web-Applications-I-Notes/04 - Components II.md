# Asynchronous code
Asynchronous code means code that does not run instantly in line. Perhaps the code needs to:
* Wait a moment
* Wait for something to happen
* Wait until data comes back from a server

```javascript
setTimeout( () => {
    console.log('Hello!');
}, 1000);

console.log('Over here!');
```

`setTimeout` will wait a moment to run, where console.log will run instantly. In the console `Over here!` will print first because setTimeout will wait 1 second (1000 ms) to run.

## Promises

A JavaScript design pattern for handling async code used as an alternative to nesting multiple callbacks (`callback` hell). A Promise is a proxy for a value unknown when the promise is created. Handlers are associated with an async action’s eventual success or failure. This lets async methods return values like synchronous methods. Instead of returning the final value, it returns a promise to supply the value in the future.

A promise can exist in one of three states:
* `Pending`: Promise is neither rejected nor fulfilled (state when first called)
* `Fulfilled`: All’s well, resolved value can be used by our code
* `Rejected`: Something went wrong, error needs to be dealt with

`Fulfilled` promises return the value as a parameter into a callback passed into `.then()`.  
`Rejected` promises pass the callback into the `.catch()`, taking an error as its argument.

```javascript
let time = 0;
const timeMachine = () => {
  return setTimeout(() => {
    return time += 1000;
  }, 1000);
};

timeMachine();
console.log(time); --> OUTPUTS: 0;
```

After 1 second the `setTimeout` function will end up manipulating the `time` variable, but when we `console.log` time we get `0`. This is because the `time` variable is defined inside of a `setTimeout` block. The block waits 1000ms because executing, so we don’t have access to the data that was manipulated yet. We’re expecting `time` to be equal to `1000` by the time we want to work with it.

```javascript
let time = 0;
const timeMachine = () => {
return new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve((time += 1000));
  }, 1000);
});
};
```

### Promise Chaining

We’ve wrapped our `setTimeout` function in a `new Promise` and passed the resolved addition result of `time += 1000`. `Promise chaining` is used when we invoke our `timeMachine` function.

```javascript
timeMachine()
    .then(newTime => {
       console.log(newTime); --> OUTPUTS: 1000 
    });
```

`timeMachine` is now receiving a callback with some item being received as a parameter. Inside of each `then` block's return statement we can be directed into a new `then` block.

```javascript
timeMachine()
  .then(newTime => {
    const myTime = newTime / 1000;
    return `${myTime} seconds have passed`;
  })
  .then(newString => {
    console.log(newString); --> OUTPUTS "1 seconds have passed"
  });
```

### `.then()`

In our first `then` block we are manipulating the time that is originally being resolved by the `Promise` and then returning it with text concatenated onto the time. We can chain on another `then` since we're returning a value from our first `then` statement.

When calling `timeMachine` we’re going to write a function called `parseTime`. It will receive a `ms` milliseconds parameter to reject a promise in the future.

```javascript
const parseTime = ms => {
  return new Promise((resolve, reject) => {
    const timeString = time / 1000;
    resolve(`${timeString} seconds have passed`);
  });
};
```

When we call our `timeMachine` function we’ll pass this `parseTime` function as an argument to our first `then` block.

```javascript
timeMachine()
  .then(parseTime)
  .then(timePassed => {
    console.log(timePassed); --> OUTPUTS: "1 seconds have passed"
  });
```

### `.catch()`

We still need to modify our `parseTime` function to cover a `rejected promise`.

```javascript
const parseTime = ms => {
  return new Promise((resolve, reject) => {
    const timeString = time / 1000;
    if (ms > 999) {
      resolve(`${timeString} seconds have passed`);
    } else {
      reject(new Error(`ms is less than 1 second promise rejected!`));
    }
  });
};
```

When this function runs our condition will resolve the promise within a `then` block on the resolve of another promise. If our `timeMachine` function resolves under 1000 ms we’ll get a rejection. Lets change the `timeMachine` function and break our promise chain to deal with it.

```javascript
resolve((time += 999));
```

We need a `catch` block for when we hit our condition and reject our promise.

```javascript
timeMachine()
  .then(parseTime)
  .then(timePassed => {
    console.log(timePassed); --> OUTPUT: DOES NOT RUN
  })
  .catch(err => {
    console.log(err); --> OUTPUT: Error: ms is less than 1 second promise rejected!]
  });
```
## HTTP

HTTP is a network protocol or set of rules governing how clients (browser) communicate with servers over the internet.

### HTTP Methods

Methods are  used to perform CRUD (Create, Read, Update, Delete) operations on server resources. They provide a common language or nomenclature for the client to let the server know the operations it wants to perform.

GET - Specifies a URL pointing to the desired resource a client wants from the server.

POST - Asks the server to add or create new resources.

PUT - Asks the server to make changes to specific resources.

DELETE - Removes or deletes data from the server.

### HTTP Status Codes

Indicates if a request has been successful or not and why. The server will set the status code for all responses sent to the client.

## Axios

Javascript library used to send HTTP requests to servers. It uses Promises since all server requests are asynchronous. To download it we will put the following line in the head section of our HTML:

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

For now we will just use it to request data from a server when we load the page, although we could request that data based on user interaction, or anything really.

`axios` is an object containing many methods including `.get`. It takes a string as its first argument with the url of the resource we are requesting.

```javascript
axios.get(url)
```

`axios.get` will return a Promise to us telling us it is busy getting the data and will return in a moment.

```javascript
axios.get('http://serverlocation.com/data')
    .then( response => {
        // deal with the response data in here
    })
    .catch( err => {
        // deal with the error in here
    })
```

We can now build a component function, request dynamic data from a server, build components based on that data, and add those components to the DOM.

First we build our component creator function

```javascript
function buttonCreator(buttonTitle){
    let newButton = document.createElement('button');
    newButton.textContent = buttonTitle;
    newButton.classList.add('button');
    
    return newButton;
}
```

Once we receieve the data we will map over it, create components, and then add them to the DOM. The `response` object will have a key on it called `data` that key will have a value of an array with a list of strings.

```javascript
axios.get('http://fakeserver.com/data')
    .then( response => {
        // Remember response is an object, response.data is an array.
        response.data.forEach( item => {
            let button = buttonCreator(item);
            parent.appendChild(button);
        })
    })
    .catch( error => {
        console.log("Error:", err);
    })
```

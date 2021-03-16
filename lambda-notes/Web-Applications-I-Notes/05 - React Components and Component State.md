# React Components and Component State

React abstracts away `document.getElementByClassname` syntax. Applications live within one targeted DOM element. We have very rich user interfaces interacting with ever-changing data, animations, and events firing. We need to offload `state` from the DOM since it is doing a lot of work.

## `Virtual DOM`

The engine that interacts with the actual DOM for us. We tell the `virtual DOM` which elements and `state` to render to the actual DOM. It “reacts” when the `state` in our app changes, and update the DOM accordingly. React detects the state of the app has changed by taking note of which nodes have changed, a process called **reconciliation**. Once it knows which nodes have changed it updates those specific nodes on the actual DOM.

## Anatomy of a React Component

```javascript
import React from 'react';

const Intro = () => {
  return (
    <div>
      <h1>Hi Lambda!</h1>
    </div>
  );
};
```

**Component** is a loose term to describe a discrete chunk of your site. Examples include:
* A header
* A footer
* A hero section

## JSX

We’re mixing two different syntaxes here. Part of this block is a regular Javascript function and part is HTML. This fake HTML is called JSX and it is a JavaScript object. This JavaScript object describes the kind of HTML we want to make. A React component is just a regular JavaScript function. We want to use JSX for a couple of reasons:
1. It’s easier to read than that big nested object.
2. It’s going to allow us to put our application’s logic directly next to the thing the logic applies to.

```javascript
import React from 'react';

const Intro = () => {
  return ( {
          type: 'div',
          props: {
              children: {
                  type: 'h1',
                  props: {
                      children: "Hi Lambda!"}
              }
          }
      }
  );
};
```

React gives us the ability to control our app’s content dynamically.

```javascript
import React from 'react';

const Intro = () => {
  const greeting = "Hi Lambda!";
  return (
    <div>
      <h1>{greeting}</h1>
    </div>
  );
};
```

Our code changed, but our output is the same. We’re just in a regular JavaScript function and free to declare a variable as we normally do: const greeting = `"Hi Lambda!";`. JSX allows us to escape back into regular JavaScript and refer to that variable with curly brackets `<h1>{greeting}</h1>`. These will evaluate any valid JavaScript expression, if we change `<h1>{greeting}</h1>` to `<h1>{2 + 2}</h1>` we get 4.

### Separation of Concerns

Separation of concerns refers to a design philosophy that each piece of your code should do one and only one thing. If we can split that function apart into smaller pieces that are easy to test individually, our application will be more robust and easier to understand. Putting our markup right next to our JavaScript may apprear to be a violation of this principle. But we can’t truly separate a <button> tag from the function the button invokes.

```javascript
//HTML FILE
<button class="button"></button>

//JS FILE
let button = document.querySelector('.button');
button.addEventListener("click", (data)=>{...logic} )
```

vs.

```javascript
<button onClick={ () => submitForm(data) } />
```

### Declarative Programming

```javascript
let myArray = [1,2,3,4,5];
```

We want to iterate over this array and double each number. **Imperative** code is the kind of approach we’re most familiar with. At a lower level all code is ultimately imperative. The problem is it’s difficult and can be hard to understand in more complex examples.

```javascript
for (i = 0; i < myArray.length; i++) {
    myArray[i] = myArray[i] * 2;
}
```

**Declarative** code doesn't tell the computer, step by step, how do something. We tell it what we want it to do.

```javascript
const double =  number => number * 2;

myArray.map(double);
```

## Image display component

```javascript
import React from "react";
function App() {
  return (
    <div className="App">
      <img
        src="https://i.pinimg.com/originals/92/94/ba/9294badee7b8f3d93fa9bc6c874641b2.png"
        alt="lightbulb"
      />
    </div>
  );
}
```

We have `className` instead of `class` because `class` is a reserved word in JavaScript. Since JSX can evaluate JavaScript expressions it can read variables, run functions, and read data from objects or arrays. We use curly braces to render the value of an object property as a header. We will evaluate a string variable as the `src` of the image.

```javascript
import React from "react";

const image =
  "https://i.pinimg.com/originals/92/94/ba/9294badee7b8f3d93fa9bc6c874641b2.png";
const titleObj = {
  title: "Light Bulb!"
};

function App() {
  return (
    <div className="App">
      <h2>{titleObj.title}</h2> // this evaluates down to the string "Light
      Bulb!"
      <img src={image} alt="lightbulb" /> // this will evaluate down to the image
      url string for the img src
    </div>
  );
}
```

At a soccer game where each team has three goals, the “state” of the game is “tied.” A traffic light has three possible states: red, yellow, and green. If you have a to-do app, it might be said to have a state of “three to-dos, none of which are completed.” Upon completing one of the to-dos you’ve changed the application’s state. The simplest state possible is a boolean.

```javascript
import React from "react";
import { render } from "react-dom";
import "./styles.css";

const white = "https://image.flaticon.com/icons/png/512/32/32177.png";
const yellow =
  "https://i.pinimg.com/originals/92/94/ba/9294badee7b8f3d93fa9bc6c874641b2.png";

function App() {
  return (
    <div className="App">
      <img src={white} />
      <img src={yellow} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
```

Since we only want one lightbulb image to show at a time, we’re going to have to keep track of its state.

```javascript
import React, {useState} from "react";
import { render } from "react-dom";
import "./styles.css";

const white = "https://image.flaticon.com/icons/png/512/32/32177.png";
const yellow =
  "https://i.pinimg.com/originals/92/94/ba/9294badee7b8f3d93fa9bc6c874641b2.png";

function App() {

  const [lightOn, setLightOn ] = useState();

  return (
    <div className="App">
      <img src={white} />
      <img src={yellow} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
```

We’re importing the `useState` hook from the React library so we can use it.

```javascript
import React, {useState} from "react";
```

```javascript
const [lightOn, setLightOn ] = useState();
```

The `useState` hook is declaring two variables in a way similar to this:

```javascript
let lightOn;
let setLightOn = (value) => {lightOn = value;};
```

`lightOn` doesn’t have a value. If we were to invoke `setLightOn` and pass a value in as an argument, we can change the value of `lightOn`.

```javascript
setLightOn("sup");
console.log(lightOn); // "sup"
```

But what if we don’t want to have to assign a value to `lightOn` right away? What if we want that variable to be initialized with a value from the get-go? We can do that.

Let’s change:

```javascript
const [lightOn, setLightOn ] = useState();
```

To:

```javascript
const [lightOn, setLightOn ] = useState(false);
```

Now it’s like we’re saying this:

```javascript
let lightOn = false;
let setLightOn = (value) => {lightOn = value;};
```

The `useState` hook `const [lightOn, setLightOn ] = useState(false);` works like this:

`lightOn` is a variable the value of which is whatever we passed in to `useState`. It’s value is the boolean primitive `false`. `setLightOn` is a function that will change the value of `lightOn`.

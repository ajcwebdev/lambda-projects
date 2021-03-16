# Composing React Components and Passing Data Via Props

When JavaScript was first introduced using it meant writing the code inside a script tag inside an HTML file, with the script running sequentially (top to bottom). Functions and variables were all global leading to performance issues from declarations holding unexpected values. Including a `<src>` attribute allowed for reusability, but was dependant on order and globally scoped. Developers used to use module patterns like IIFE (Immediately Invoked Function Expression). This function runs as soon as it is defined by calling another set of parentheses after the enclosing parentheses.

```javascript
(function() {
  //lexically enclosed function statement
})();
```
### Server Side JavaScript

Node.js allows JavaScript to execute outside of the browser. CommonJS was a JavaScript specified standard library that defined terms for sending data to and from file systems. Webpack and rollup compiled packs of modules and assigned missing dependencies before sending them to the browser. Babel translates source code for the browser and converts the latest features of ES6 into compatible ES5.

### JS Modules (ECMAScript Modules)

ES Modules are the first standardized syntax for using modules in JavaScript. They export functions, data, components from our files by prefixing the `export` keyword. To bring features into our file we need to:
* Use the `import` keyword
* Include the name of the exported item
* Specify where it’s located

## Props

To pass information held on state inside one component to another component, we pass them as props. We never make changes to props data because props are read-only. This ensures a clean and organized data flow. We know exactly where changes are made to our application and can easily find issues and fix them.

### Managing state and props within components

A stateful component is one that holds state data. It can be either:
* An object placed inside the constructor function
* A function component that includes the `.useState` function

When data comes into our application, it is loaded and stored on state. It can be stored in a centralized component specifically for state management, or a component rendering other components. Centralize data consumed in multiple components in a top-level component. Data specific to a certain component can live locally inside that component.

Components rendered in a stateful component can receive state data via a props attribute sent down on the props object to the child component. If we want to change our data we do not change the prop data itself. We send back changes we should make to our state holding component. Stored changes are sent back to the parent container as enclosed information in a called function.

```javascript
const user = { name: "Hubert", age: 27 };
```

Our user object is saved to a state variable with the state hook. A named prop object is declared in the return statement inside our JSX. It is set equal to the state variable. Data set as props data is not state data and should not be mutated. Use the provided `setUser` function to change the value of the props data.

```javascript
const App = () => {
  const [user, setUser] = useState({ name: "Hubert", age: 27 });

  return <UserInfo user={user} />;
};
```

`UserInfo` receives state variable as props from parent component. Props are passed as an object argument and sent down as a named “props” object to child component (of `UserInfo`) as `DisplayName`. The props data passed as JSX attributes on `DisplayName` are set to a variable and passed inside curly braces as object data. The named variable is set as an object (containing user data) on our `props` object. It is now reachable from inside the component.

```javascript
const UserInfo = (props) => {
    return (
        <div>
            <DisplayName user={props.user} />
        <div>
    )
}
```

`DisplayName` receives the `props` object as an argument and returns a React element where we pass the selected data to display:
* We first reference props ->
* Then our named props object ->
* Then the attribute name of the data we want to display (Hubert).

```javascript
const DisplayName = props => {
    return (
        <div>
            <h2>Hello, my name is {props.user.name}.</>
        <div>
    )
}
```

The above code block will render “Hello, my name is Hubert.” Why do we pass information around in this way?

#### Control
* Just like modules, breaking our components down into smaller functions gives greater control over what is displayed and how it works.
* By keeping state in a few select components and passing props we minimize the risk of making unintended changes to our state data.

#### Readability
* Separate files are easy to keep in order.
* It's easier for other developers to read through our code, know where our state is held, and where it’s being sent.

#### Maintenance
* If we want to make changes, we can find components quickly.
* Working in files that only manage one or two different aspects of our application is a much easier task than scrolling through hundreds of lines of code.
* We can isolate any problems that come up and debug faster.

#### Reusability
* Reusable components can render any data that we pass through, so long as it matches the type on our object.
* With a few modifications we can render additional data added to our object.
* We could pass in an array of hundreds of objects and render the information contained on each one with a few additional lines of code.

### Nesting components

```javascript
const App = props => {
  return (
    <div>
      <h2>Hello world from, {props.name}</h2>
      <div>
        <h4>My best friend in this world is: {props.bestFriend}</h4>
        <p>My favorite book is: {props.favoriteBook}</p>
      </div>
    </div>
  );
}
```

This component relies on 3 props. We have a component nested inside of another component. First we'll break out the inner DOM elements that render the `best-friend` data into it’s own component.

```javascript
const BestFriend = props => {
  return (
    <div>
      <h4>My best friend in this world is: {props.bestFriend}</h4>
      <p>My favorite book is: {props.favoriteBook}</p>
    </div>
  );
};
```

We also want `BestFriend` to be reused and nested. When we use this component inside of our `App` component, we can pass data to it as props.

```javascript
const App = () => {
      return (
        <div>
          <BestFriend bestFriend="Homer Hickam" favoriteBook="October Sky"/>
        </div>
      );
    };
```

Our `</p>` tag could also be it’s own component.

```javascript
const Book = props => <p>My favorite book is: {props.favoriteBook}</p>;
```

And to use it nested within the `BestFriend` component

```javascript
const BestFriend = props => {
  return (
    <div>
      <h4>My best friends in this world is: {props.bestFriend}</h4>
      <Book favoriteBook={props.favoriteBook} />
    </div>
  );
};
```

React can pass props down as far as we’d like. Nesting components super deep can cause issues when attempting to work with the props being passed down.

## Parent Components and Child Props

Container components can render their children and grandchildren.

```javascript
const simpsonData = {
  name: "Orville Simpson",
  spouse: "Yuma Hickman",
  children: [ {
      name: "Abraham Simpson",
      spouse: "Mona",
      children: [ {
          name: "Homer Simpson",
          spouse: "Marge Bouvier",
          children: [
            {name: "Bart Simpson"},
            {name: "Lisa Simpson"},
            {name: "Maggie Simpson"}
          ]
        }
      ]
    }
  ]
};
```

### `Parent` Component

```javascript
const Parent = props => {
  return <h1>Parent: {props.name}</h1>;
};
```

Mount the component inside of a container component.

```javascript
<Parent name={simpsonData[0].name} />
```

We want our Parent component to conditionally mount a child component if a `child` prop is on the `props` object. A `Ternary Operator`  checks if the `child` prop is defined.
* If so, mount a `Child` component
* If not, mount `null`

```javascript
const Parent = props => {
  return (
    <div>
      <h1>Parent: {props.name}</h1>
      {props.child ? <Child name={props.child} /> : null}
    </div>
  );
};
```

### Child component

```javascript
const Child = props => {
  return (
    <div>
      <h2>Child: {props.name}</h2>
      {props.grandChild ? <GrandChild name={props.grandChild} /> : null}
    </div>
  );
};
```

This has the same behavior as the Parent. A `<GrandChild />` component is mounted if the correct prop exists.

```javascript
const GrandChild = props => {
  return (
    <div>
      <h3>{props.name}</h3>
    </div>
  );
};
```

Mount all components

```javascript
<Parent
  name={simpsonData[0].name}
  child={simpsonData[0].children[0].name}
  grandChild={simpsonData[0].children[0].children[0].name}
/>
```

## Button Component

We’re going to build a button component that, when clicked, returns a button and renders a new app component. The button component will have an array of colors represented by string hex values that we can use to describe our dynamic data. We’ll need to pass our state variable from app down via props to our button component. Also, we need to pass along a function that takes in an array and calls our setter function. While hooks make it easy to bring this functionality directly into any component, we’ll build this app and pass it for demonstrative purposes. In case you want to build additional components, you’ll be all set to go ahead and update their color as well.

Since we’ll be using hooks, the first thing we need to is import the `useState` function to our file as named import.

```javascript
import React, { useState } from "react";
```

Next call `useState` at the top of your app function component and set its value to a destructed array containing the state variable and its setter function, in this example, color and setColor, respectively. Set the default value to the hex value for the color ‘white’. Then render our soon to be built Button component inside App and pass it our state variable as props.

```javascript
function App() {
  const [color, setColor] = useState("#FFFFFF");

  return (
    <div className="App">
      <Button color={color} />
    </div>
  );
}
```

Now let’s write the function that our button will accept. We’ll name this function `changeColor` and have it take an array as its parameter. In our function statement, we call setColor and pass our array parameter using bracket notation to select a random index of the data given in the array dynamically. You probably recognize most of the code, but all that matters is it evaluates to random whole number from 0 to the max-index of the given array. Don’t forget to pass the function to button component as props; otherwise, it won’t be there when you try to access it.

```javascript
function App() {
  const [color, setColor] = useState("#FFFFFF");

  const changeColor = array => {
    setColor(array[Math.floor(Math.random() * array.length)]);
  };

  return (
    <div className="App">
      <Button color={color} changeColor={changeColor} />
    </div>
  );
}
```

Alright, now all we need is the button. We’ll go ahead and build it in the same file to keep things simple. Below our app component declares the button function component. While it’s accessible anywhere in the file, we want to also place our array of colors inside of `Button` in case we decide to put it in its own file later. Next, return a `<button>` element and give a `style` and `onClick` attribute. Here is where we’ll pass our, now dynamic, props. In the `style` tag set `background` to `props.color` to represent our state value back in App. Set the `onClick` attribute to an anonymous arrow function that returns `props.changeColor()` and pass in our colors array as an argument.

```javascript
const Button = props => {
  const colors = [
    "#FFBAAA",
    "#27576B",
    "#D47F6A",
    "#AA7539",
    "#003D19",
    "#6E91A1",
    "#552D00"
  ];

  return (
    <button
      style={{ background: props.color, height: "50px", width: "200px" }}
      onClick={() => props.changeColor(colors)}
    >
      Click Me!
    </button>
  );
};
```

The button is now dynamic because our setter function can set the color variable the button receives.

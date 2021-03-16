# Class Components

React comes with a constructor class called `Component` that has special properties on it. React gives us functionality a single `base Component`. The `React.Component` base class allows us to tap into the `Component Lifecycle`. These methods (known as life cycle hooks) give us control over how our components work. To use these methods we have to build out a class component that `extends` the `React.Component` parent class.

```javascript
class FooComponent extends React.Component {}
```

## CCR

By creating components as classes, you can set up a data object that your component is concerned with. This is done using `state` and setting up that object on our constructor method. Once we have some data that we can render out to the DOM, we need a vehicle that will allow us to render that data. This is achieved with the JSX method `render()` from within the life-cycle hook.

1. Declare `class component` by extending the `React.Component` parent class: `class FooComponent extends React.Component {}`.
2. Use the `constructor` function to set up some state. We need to call `super()` because we’re calling extends; otherwise we won’t have access to `this`.
3. Render UI to the DOM by calling the life-cycle method `render`.

### Class

Declare your class and extend the `React.Component` Base class.

```javascript
class FooComponent extends React.Component {
```

### Constructor

Set up the constructor and add state.

```javascript
constructor() {
  super();
  this.state = {};
}
```

### Render

Render UI and return JSX.

```javascript
render() {
  return <div>Hello, I am Foo Component</div>;
}
```

The final component will look like this:

```javascript
class FooComponent extends React.Component {
  constructor() { 
    super();
    this.state = {};
  }
  render() {
    return <div>Hello, I am Foo Component</div>;
  }
} 
```

To make our class component more dynamic we use some data that we’ll pre-define as some information we’d like our component to display. We’ll then take that data and use `interpolation` to present it to the DOM within some text. The `state` object that we set up on our `constructor` allows us to drive our UI using data.

```javascript
class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return <div>Hello From App!</div>;
  }
}
```

Let’s add a property to our state data. Define a `message` property on the state object.

```javascript
this.state = { 
  message: "Hello from App State!!"
};
```

Now that we have the message on our component’s state, we can use it through interpolation. In our render method, let’s change the message inside of `div` to reference the state object.

```javascript
render() {
  return <div>{this.state.message}</div>;
}
```

### State to Props

React is useless if we can’t pass state around from one component to another. We use `state to props` to achieve functionality. Whatever is set on the state of one `Component` can be shared amongst all components by passing it down as props. Because state is persistent as long as the component is on the screen, we can use it to hold on to memory for our application. Memory is any data that we pull in from a server, any edits from a submission form, or users interaction with your web page. State is just an object that lives on the `class component's` constructor. We can take this state and pass it around as props. When the state object changes our component will re-render. We can also pass whatever data is found on this state object around as props to other components. Props are read-only, and components can use props to display information to the screen. One other principle that is built into React is that when a component’s props are bound to the state of a parent component, the child component will re-render as well.

```javascript
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      welcomeMessage: 'world!'
    };
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.state.welcomeMessage}!</h1>
      </div>
    );
  }
}
```

Instead of rendering an `<h1>` lets put this message in another component and pass it through.

```javascript
const WelcomeBanner = props => <h1>Hello, {props.message}!</h1>;
```

To pass this around properly, we need to re-factor our render function inside the `<App />` component.

```javascript
render() {
  return (
    <div>
      <WelcomeBanner message={this.state.welcomeMessage} />
    </div>
  );
}
```

We are sharing data between a component’s state and a component’s props. This means that when the state object changes, so too will the props.

Redux is a standalone library. We have to use a second helper package called `React-Redux` that will enable us to string together Redux within a React application.

```
npm install react-redux redux
```

## Store

We will use the `createStore` function from `redux`

```javascript
import { createStore } from 'redux';
```

`createStore` takes a single reducer representing the global state of our application. We create a `store` variable and use `createStore` to create the Redux store.

```javascript
const store = createStore(reducer);
```

`reducer` is a function that returns an object representing our state.

```javascript
function reducer() {
  return {
    title: 'Hello world! I\'m in the Redux store!',
  }
}

const store = createStore(reducer);
```

`react-redux` gives us a `<Provider></Provider>` component that wraps around our entire application. We pass our newly created store to that component as a prop. Import `Provider` from `react-redux` within our root component (`Index.js`).

```javascript
import { Provider } from 'react-redux';
```

We wrap our `<App/>` with the `<Provider>` component and pass a `store` prop set equal to the store we created.

```javascript
<Provider store={store}>
  <App/>
</Provider>
```

## Connect

Now we have a store to manage our state. We need to connect our components to that store using the `connect` function within the components themselves. We can also build a helper function named `mapStateToProps` within the component files to tell the `connect` function what pieces of state we want to access. This function will map pieces of our Redux state to the props of our component. The object initially returned out of the reducer function now looks like this:

```javascript
{
  user: {
    name: 'Dustin'
  },
  movies: [
    'Star Wars',
    'Lord of the Rings',
    'Harry Potter'
  ],
  todoList: [
    { task: 'Learn Redux', id: 0, completed: false }
  ],
  moviesToWatch: 13
}
```

Create a component called `MovieList`. Import the `connect` function into your component:

```javascript
import { connect } from 'react-redux';
```

The `connect` function is used where we export the component at the bottom of the file. We invoke `connect` twice (function currying). First with two arguments - a function and an object. Second with just the component we are trying to connect. For now, we’ll pass `null` and `{}` into the first invocation.

```javascript
// export default MovieList; Not this way if we are connecting this component!
export default connect(null, {})(MovieList)
```

`MovieList` is now connected to the store. Our `mapStateToProps` function tells `connect` which pieces of our state we want to bring in to this component. This function takes in `state` as a parameter, then returns an object where the properties can be passed to props, and the values are retrieved from the store for our component. For a `MovieList` component, we probably only want to know about the `movies` array and the `moviesToWatch` number, maybe the `user` object. We’ll not worry about the `todoList`, since our component doesn’t need to know about that part of our state. Let’s bring those three pieces of our state into the component.

```javascript
const mapStateToProps = state => {
  return {
    movies: state.movies,
    moviesToWatch: state.moviesToWatch,
    user: state.user
  }
}
```

Let’s pass this in as the first argument to the first `connect` invocation. Notice that `state` is being passed into this function. Under the hood, connect passes our entire state tree to `mapStateToProps`. That means that within that function, we have access to all our state via the `state` argument. But, the component only receives the pieces of state that we turn out of `mapStateToProps`.

```javascript
export default connect(mapStateToProps, {})(MovieList)
```

Now, if you look at the props in the React tools, you will see that all three pieces of our state have been passed to our component through the `connect` function. Other props we’ve passed to this component the traditional way are still going to be available. We are using a function that takes in a component, extends its functionality, and returns a component, so `connect` is a higher-order component.

## Actions

The Redux store is read only. The only way to modify application state when using Redux is by dispatching actions. We can use action creators and the `react-redux` library in order to dispatch those actions.

Actions in Redux are packets of information that contain an action type and associated data. In code, an action is simply an object with up to two properties - a `type` property and an optional `payload` property. Each action MUST have a `type` property, a string that explains what interaction just happened. All caps and underscores are used for types (`LOGIN_USER` or `TOGGLE_TODO`). The payload property is data that goes along with that interaction. Actions are “dispatched” to our reducer. They are passed into the reducer function as an argument. When our reducer recieves an action, it will update the state according to the type and payload on the action.

Let’s say we have a toggle handler function that switches a boolean field called `show`, which is set on our state in our Redux store. An action for such an event would look like this:

```javascript
{ type: "TOGGLE_SHOW", show: !state.show };
```

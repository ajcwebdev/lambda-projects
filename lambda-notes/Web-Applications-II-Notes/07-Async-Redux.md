## Finite State Machine

A state machine is a mathematical model of computation. A machine can have a finite number of states, but it can only operate in one state at a given time. There are different types of state machines, but for building UIs (and understanding Redux), we’ll concentrate on the type that has an initial state. The next state is calculated based on input and the current state.

A State Machine has:

* initial state (store).
* current state (store).
* inputs or actions (action creators) that trigger transitions (reducers) to the next state.

It helps to think in terms of states instead of transitions. Redux is NOT a finite state machine, but the thinking in states helps our understanding of how Redux works.

## Middleware

Middleware intercepts some process, runs a function at the intercept point, then (usually) continues the process. Or, sometimes middleware stops the process entirely. When whatever “process” in question is kicked off, there is usually data that is flowing through different functions. With middleware, when we “intercept” the process, we are usually trying to use that flowing data. Middleware in Redux is very common and gives us a chance to do a few different things with the data passing from action creators to the reducers.

In Redux middleware intercepts every action before it flows through to the Reducers. Middleware can:

* stop actions.
* forward an action untouched.
* dispatch a different action.
* dispatch multiple actions.

We can have multiple middleware. Middleware runs sequentially, in the order, they are defined. Middleware is added to the store when it is created.

## Redux Logger

```javascript
import logger from 'redux-logger';
```

We need to import a helper function from redux. This function is the `applyMiddleware` function. We pass `logger` into this function, but the `applyMiddleware` function is going to be inside the `createStore` function.

```javascript
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```

## Redux Thunk

In Redux the Reducers are synchronous by default. If we need to perform asynchronous operations, they need to happen before the actions flow through the reducers stack. We can use middleware to handle asynchronous requests. Redux Thunk is a middleware created by Dan Abramov, that provides the ability to handle asynchronous operations inside our Action Creators. Since the Redux action -> reducer flow is synchronous, we will use Redux Thunk to make the flow asynchronous and make API calls from our action creators.

We are changing up the action creators to perform asynchronous API calls. We can do this because we know that Redux middleware intercepts the normal Redux flow, and can make a call before actions make it to the reducer. `thunk` is a function that’s returned by another function.

```javascript
function not_a_thunk() {
  // this one is a "thunk" because it defers work for later:
  return function() {
    console.log('do stuff now');
  };
}
```

When an action creator is called `redux-thunk` intercepts and acts on returned data. If the thing returned is an action, it forwards the action through to the reducer. But, if the thing returned is a function, aka a thunk (a function returned from a function), then it invokes the thunk and passes the `dispatch` function as an argument to it. The action-creator returned thunk has access to the dispatch function. So we can run an async function, like an API call, and inside the `.then()` we can dispatch an action. Here's an action creator that does this when a user logs in:

```javascript
function logInUser(creds) {
  // this returned function is the thunk, and gets dispatch passed in
  return function(dispatch) {
    return axios.post('/login', creds).then(res => {
      const loggedInAction = { type: USER_LOGGED_IN, payload: res.data.user }
      dispatch(loggedInAction);
    });
  };
}
```

The thunk has access to dispatch, and can dispatch a new action based on the result of the API call! Let’s clean this up a little with arrow function syntax. The following code snippet is essentially the exact same as the above snippet:

```javascript
const logInUser = creds => dispatch => {
  return axios.post('/login', creds).then(res => {
    const loggedInAction = { type: USER_LOGGED_IN, payload: res.data.user }
    dispatch(loggedInAction);
  });
}
```

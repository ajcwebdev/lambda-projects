## Reducer Function

Reducer functions take two arguments – the current state and action – and return a new, updated state object based on both arguments.

```javascript
(state, action) => newState
```

Consider a JavaScript function that passes an integer and returns that value + 1, without mutating the original integer’s value. We could pass in our initialState value (0) and return a new value (1) without overriding the initialState.

 ```javascript
const initialState = 0
const reducer = (state) => {
  const newState = state + 1
  return newState;
}

const newStateValue = reducer(initialState);
console.log(initialState, newStateValue); // 0, 1
```

Returning an integer or string is not always the best choice as data grows more complex. In the previous example the component’s state utilizes an object as its data structure of choice.

```javascript
const initialState = { count: 0 }
const reducer = (state) => {
  return { count: state.count + 1 }
}
```

We are returning a new object without directly mutating or overriding the `initialState` object. This reducer function is a pure function without any side-effects.

## Action Object

The action, represented by an object, contains properties related to some action that happens in our apps. Every action object is required to have a type property, which will “inform” the reducer actions happening in the app. The type allows the reducer to know what part of the state needs to change. Let’s show the reducer that we want to increment our count state by passing in an `action` with `'increment'` as the type.

```javascript
const initialState = { count: 0 }
const reducer = (state, action) => {
  if (action.type === 'increment') {
    return { count: state.count + 1 }
  }
}

reducer(initialState, { type: 'increment' })
```

We want our reducer to be able to reduce the state.

```javascript
const initialState = { count: 0 }
const reducer = (state, action) => {
  if (action.type === 'increment') {
    return { count: state.count + 1 }
  } else if (action.type === 'decrement') {
    return { count: state.count - 1 }
  }
}

reducer(initialState, { type: 'increment' });
reducer(initialState, { type: 'decrement' });
```

This makes our state management predictable. Our current state passes into the reducer, and an action follows to tell the reducer how to update the state. We can also add a `payload` property to our action objects (sometimes called `data`). Our reducer needs to have some data passed into it through the action to be able to update the state correctly, and this is where that data would live.

```javascript
const initialState = { name: 'Donald Duck' }
const reducer = (state, action) => {
  if (action.type === 'changeName') {
    // how do we know what to change the name to? The action payload!
    return { name: action.payload }
  }
}

reducer(initialState, { type: 'changeName', payload: 'Mickey Mouse' });
```

The action, and its associated property `type`, allow us to use the reducer to perform conditional state transformations. JavaScript’s `switch` statement will make the conditional in our reducer more readable.

```javascript
const initialState = { count: 0 }
const reducer = (state, action) => {
  // if (action.type === 'increment') {
  //   return { count: state.count + 1 }
  // } else if (action.type === 'decrement') {
  //   return { count: state.count - 1 }
  // }
  // we pass in the value we want to look at (action.type):
  switch(action.type) {
    // then we make a "case" for each possible value we expect:
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 }
    // finally, we give a "catch-all" which is just to return state untouched.
    // Never leave this out. There should always be a default:
    default:
      return state;
  }
}

reducer(initialState, { type: 'increment' });
reducer(initialState, { type: 'decrement' });
```

The reducer now looks like this:

```javascript
const initialState = { count: 0 }
const reducer = (state, action) => {
  switch(action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state;
  }
}

reducer(initialState, { type: 'increment' });
reducer(initialState, { type: 'decrement' });
```

## useReducer

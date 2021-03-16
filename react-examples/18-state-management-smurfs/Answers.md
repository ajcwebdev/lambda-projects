1. What problem does the context API help solve?

The context API gives a simpler syntax for state management in React and provides similar functionality to Redux.

1. In your own words, describe `actions`, `reducers` and the `store` and their role in Redux. What does each piece do? Why is the store known as a 'single source of truth' in a redux application?

Reducers are pure functions that take in the state and an action as parameters. The action describes how the state will change. The store is a global variable that holds all of your applications state. The store is known as the single source of truth because it is a global variable that holds all the state in the app.

1. What is the difference between Application state and Component state? When would be a good time to use one over the other?

Application state is global and holds all of the state for your entire application. Component state only holds state relevant to that specific component. Component state is useful when you have a small application with few components. Application state is useful when you have a large, complex application and you want to centralize all of your state.

1. Describe `redux-thunk`, what does it allow us to do? How does it change our `action-creators`?

Redux thunk is middleware that extends the Redux store's abilities. It lets you write asynchronous logic that can intercept actions and perform logic before they reach the store. It is useful for debugging actions in transit.

1. What is your favorite state management system you've learned and this sprint? Please explain why!

The Context API is my favorite state management system because it requires the least amount of code and feels the most intuitive to me.
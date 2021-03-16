# Answers

1. What is React JS and what problems does it solve? Support your answer with concepts introduced in class and from your personal research on the web.

React is a JavaScript library for building user interfaces. It aims to break user interface designs down into components that can be easily reused.

1. Describe component state.

State represents the current information in a component that will change over the lifetime of that component. For example at the beginning of a soccer game the state is 0-0, but as the game goes on the state changes as either team scores goals.

1. Describe props.

Props are used for information in a component that will not change over the lifetime of that component. For the same soccer game analogy the props would be the names of the teams, you could not change the name of a team halfway through a game.


1. What are side effects, and how do you sync effects in a React component to changes of certain state or props?

Side effects are any change to the application that come from outside of the applications code like an external API call. In React we sync effects with the useEffect hook.

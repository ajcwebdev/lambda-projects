
In a typical React application, data is passed top-down (parent to child) via props. This is cumbersome for certain types of props (locale preference, UI theme). Context shares values between components without having to pass a prop through every level of the tree. We use the Context API when we have global data that lots of components share (user/theme), or when we have to pass data through intermediate components. One caveat is that it can make components harder to reuse.

## Context Object

```javascript
import { createContext } from 'react';

const ContextObject = createContext();

// usually we'll name the object by the data it will hold (UserContext/MoviesContext)
```

This object gives us two components `ContextObject.Provider` and `ContextObject.Consumer`.

## Provider

`Provider` accepts a single prop called `value` used to provide data across our app.

```javascript
<ContextObject.Provider value={dataToPassDown}>
  <NestedComponent />
  <OtherNestedComponent />
</ContextObject.Provider>
```

## Provider

Context `Consumer` consumes and returns `value` provided by `Provider`.

## useState and useEffects with Context

`useState` holds and sets user state. `useEffect` performs a pseudo API call that sets “my user” to state. `User` component rendering `Name goes here` is a placeholder. We want to be able to provide data to the child component (based on user data sitting in state) and consume it, using `Context API`. First we make a new folder named `contexts` to hold all the context objects we create.

1. Inside that folder we create a `UserContext.js` for our first context object
2. Inside that file we create our `UserContext`

```javascript
import { createContext } from 'react';
export const UserContext = createContext();
```

Now that we have created our `UserContext` let’s import it into our `index.js`.

```javascript
import { UserContext } from '../contexts/UserContext';
```

After creating and importing our `UserContext` we can start providing our user data across our application. We need to wrap all of our child components inside of our `UserContext Provider` and pass it a prop of `value`. This prop contains our user state.

```javascript
return (
    <UserContext.Provider value={user}>
        <div className="container">
            <User />
        </div>
    </UserContext.Provider>
);
```

This allows all child components of our `UserContext Provider` to consume the value(s) (user object) that come from the hook.

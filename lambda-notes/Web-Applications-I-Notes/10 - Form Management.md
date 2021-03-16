# Form Management

Signup, login, search, create, edit, dropdowns, checkboxes, radio buttons, regular buttons and more. The humble <form> tag carries a lot of weight on it shoulders. For many applications it’s the artery between your code and the user – the only means by which they have to tell us what we need to know. Because forms are natively stateful in HTML (meaning the form itself keeps track of the information we need) using them in React can feel a bit odd, but it wouldn’t be fair to blame <form> for that. After all, <form> was here first; it was a stateful component before it was cool.

Forms in websites and web applications have been around for a long time. They are one of the best ways for companies to gather data from their users, and to get your users to interact with their software. Needless to say, they are vital in the web landscape.

Every language and framework will handle form data a bit differently, but most of them will use the same basic HTML elements to build a form. Each will have their own responsibilities. Here are the elements we’ll talk about right now with a brief definition from MDN:

## `<form>`

HTML `<form>` element represents a document section that contains interactive controls for submitting information to a web server.

HTML `<input>` element is used to create interactive controls for web-based forms in order to accept data from the user.

HTML `<label>` element represents a caption for an item in a user interface.

* Form contains interactive controls (form elements)
* Input is the interactive control used to collect data from the user
* Label is how we caption the input to provide a better experience for our users.

To create a login form we’ll start by creating a blank text input field.

```javascript
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <form>
        <input />
      </form>
    </div>
  );
}

export default App;
```

This only renders a basic text input field, but already we could ask a couple of questions. First, if all we’re rendering is an `<input>`, then why are we bothering to put it inside a `<form>`? Second, there are a lot of different kinds of `<input>`’s, how does this one know to be a text input? The answer to the first question has to do with the form being stateful, as we’ll see soon. To some extent, the `<form>` tag will be able to keep track of what its children are doing. As for the second question, a basic text field is what an `<input>` tag defaults to, but this isn’t very semantic, is it? Another way to say it is that this code isn’t very “self-documenting,” meaning other developers looking at our code in the future might have a harder time understanding what it’s for. What’s even worse is that screen readers might have difficulty parsing what it’s for. A trivial effort from us can mean a world of difference for a future developer or for someone using a screen reader.

Let’s do better by making this code a friendlier to developers and screen readers alike.

```javascript
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <form>
        <label>
          Username:
          <input type="text" />
        </label>
      </form>
    </div>
  );
}

export default App;
```

The next step is to start controlling the data flow through forms. Browsers actually allow you to do this natively, but we want to manage our data through React, not through HTML.

### `onChange` event handler

So now that we’ve got a way for users to input text, the next step is to capture that value. In a regular DOM environment, each change to this input would create a “change event” that the DOM API would expose to us, but remember: React operates out of a virtual DOM. When React is deciding what to render to the page, the DOM doesn’t even exist yet. That’s why the React team created “synthetic events,” which effectively simulate DOM events inside the virtual DOM. We don’t need to worry about the details of synthetic events at the moment. They’re designed to work as much like their native DOM counterparts as possible, and for the vast majority of cases, they do, but you should at least be aware of their existence.

The `onChange` handler on an input captures the typing event.  The `event` object stores the new value from the input. We get access to the typing event from `onChange`, because the event holds the value of the input. Because of this, we have access to what our user’s input from the event object! This pathway is vital if we want to manage input values in react state, rather than through the DOM.

As we’ve seen with other event handlers, we will pass in a callback function to `onChange`. This can be done inline or with a function defined elsewhere (usually in the component). Notice that the event object gets passed into the callback function as a parameter.

```javascript
// inline
<input onChange={event => console.log(event)} />

// function defined somewhere else
const logEvent = event => {
  console.log(event);
}

...

<input onChange={logEvent} />
```

If we use the `onChange` synthetic event listener on our `<input>` tag, we’ll be able to capture its value. Then we’ll set that value to a state variable. We can access the value like this - `event.target.value`.

```javascript
const Form = () => {
  const [inputValue, setInputValue] = useState("");

  const changeHandler = event => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <form>
        <label>
          Favorite Ice Cream:
          <input type="text" onChange={changeHandler} />
        </label>
      </form>
    </div>
  );
};
```

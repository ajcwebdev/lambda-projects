Forms can have many types of inputs including:
* Radio buttons
* Check boxes
* Passwords
* File uploads

### Checkboxes
Set-default
Just like with text inputs you can change the default values of checkboxes from not checked to checked. Similarly you can specify a value that

In the example below the box would be checked by default like so: 

```javascript
<input type="checkbox" name="nameOfChoice" value="1" checked>
```

Without the checked argument, it would look more like this: 

```javascript
<input type="checkbox" name="nameOfChoice" value="yes">
```

Here we also changed the value from the number 1 to the string yes, but that doesn’t actually change anything for the user, it simply specifies what should be added to the form object.

Control Inputs
That brings us to our next point, controlling inputs. Controlling inputs for checkboxes, buttons, and other non-text fields can be funky. If you want non-default values when a field is checked you need to specify them in form setup and this often requires some additional logic.

The following example would create a checkbox that, when checked, would equal true and would handleInputChange like you learned earlier. We will learn to control the state when we talk about form validation.

```javascript
<label>
    Check This Box:
    <input
        name="isGoing"
        type="checkbox"
        checked={true}
        onChange={handleInputChange} />
</label>
```

### Dropdown

Dropdown menus are really important for gathering mass data because they insure data quality. This is done with the <select> element. Between the <select> tags, you’ll place all of the options you want to have in the dropdown menu.
```javascript
<form>
  <select id="friends" name="friends">
    <option value="Ross">
    <option value="Rachel">
    <option value="Monica">
    <option value="Phoebe">
    <option value="Chandler">
    <option value="Joey">
  </select>
</form>
```
  
Let’s build out a form to gather user information with radio buttons, a checklist, and a dropdown. These are some common data types you might work with in your time as a web developer.

#### Set up form

Using our knowledge from the “form management” module, we’ll first set up a basic form with a single text input, Name.

```javascript
  return (
    <div className="App">
      {console.log(name)}
      <form>
        <label>
          Name:
          <input type="text" onChange={event => handleChange(event)} />
        </label>
        <button onSubmit={() => handleSubmit()}>Submit!</button>
      </form>
    </div>
  );
}

export default App;
```

#### Add Radio Buttons

Next, we’ll add radio buttons. If we wanted to gather categorical data, like an age range, we might use radio buttons. To make radio buttons all we need to do is add input elements with the type "radio". These are, by default, inline elements, so they’ll render nicely in a row.

```javascript
 <p> Age Range: </p>
          <label>
            13-18
            <input type="radio" onChange={event => handleChange(event)} />
            19-24
            <input type="radio" onChange={event => handleChange(event)} />
            25-39
            <input type="radio" onChange={event => handleChange(event)} />
            40+
            <input type="radio" onChange={event => handleChange(event)} />
            </label>
```

#### Add Dropdown

Another way to gather categorical data is through a dropdown. Let’s add one here to ask which state the user lives in. For illustration purposes, we’ll only add 5 states, but you could easily use an array and .map method to add all 50 states.

```javascript
<form>
  <select id="states" name="states>
    <option value="Alabama">
    <option value="Alaska">
    <option value="Arizona">
    <option value="Arkansas">
    <option value="Colorado">
  </select>
</form>
```

#### Add a checklist

Last but not least let’s play around with a checklist. Checklists are a great way to gather boolean data. For these we simply change the input value to "checkbox". We also need to consider what a check means and set up our form accordingly. In the example below, when the box is checked we update the state of “RSVP” to “yes”,

```javascript
<label>
    RSVP:
    <input
        name="isGoing"
        type="checkbox"
        checked={false}
        onChange={handleInputChange} />
</label>
```

Add a non-text field to a project from the form management lessons.

Learn to validate user input in forms
As our users start typing into our beautiful form we’ve created, they will very often type in the wrong data into the wrong field. Or maybe they will not format the data correctly (think setting up strong passwords, or even typing in a phone number or email). We want to give our users the best user experience by giving them informed feedback when they’ve filled out our form incorrectly. This is done with form validation.

You know when you try to make your password “password” and the form tells you to chose a stronger password? That’s called validation. There are many ways to validate input before you submit the form to a server or other service and they’re all really useful for insuring the quality of data.

One common strategy is to compare the input string to a regular expression model of expected characters and handle the input based on the results of the comparison.

Another popular method is to have a library such as Yup handle the validation for us - yup has built in methods to deal with email addresses, passwords, strings, numbers, and more. You can read the full documentation here.

### Validating a String
Before we move into the follow along tutorial, lets look at how we could use Yup to validate if an input was a string. This is in a lot of ways the “Hello World” of form validation.

First, you’ll need to install yup with npm install --save yup.

Then, we simply declare a schema with let schema = yup.string(); and test our schema on a new line with await schema.isValid('hello world');. This would return “true” since ‘hello world’ is a string.

### Validating a Form
Form validation is slightly more complicated but it follows the same logical pattern. First we declare a schema, then we validate data.

In a forms app, the schema defines what the form looks like. It is kind of like a form outline, telling yup what the existing fields are and how they should be validated. We’ll walk through this process below.

You can always chose to use additional helper libraries, like Formik, to validate forms, but for learning purposes it is best to understand the validation process with just Yup.

We’ll start with a Yup login form consisting of an email and password field.

```javascript
import React from "react";

// Basic submit event handler and console.log to confirm form submitted
  const formSubmit = e => {
    e.preventDefault();
    console.log("submitted");
  };

// Create state for the form values. We will want to update state later on, but for now... empty strings!
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    website: "",
    password: ""
  });

// Define form elements: email, password and terms/conditions

function LoginForm() {
  return (
    <form>
     <label htmlFor="name">
        Name
      <input type="email" name="email" placeholder="Email" />
      />
      <label htmlFor="email">
      <input type="password" name="password" placeholder="Password" />
       <label htmlFor="terms">
        Do you agree to the terms and conditions?
      <input type="checkbox">
      <button>Submit!</button>
      />
    </form>
  );
}
```

To start the validation process, add Yup as a dependency and import it into the component file. In the command line we’ll type:

Copy
```
npm install --save yup
```

and in our file:

```javascript
import * as Yup from "yup";
// You may see this as (import Yup from 'yup') in some tutorials, the above method seems less buggy
```

Next we will define our schema - which is basically a description of what each named field is supposed to look like so that Yup can pass or fail the input. Give it a shape of all the elements in your form. Depending on what you’re trying to validate you give it strings, checkboxes, etc. That might look like so:

```javascript
const formSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  password: Yup
    .string()
    .min(6, "Passwords must be at least 6 characters long.")
    .required("Password is Required")
  terms: Yup
    .boolean()
    .oneOf([true], "You must accept Terms and Conditions")
    // required isn't required for checkboxes.
});
```

The formSchema is a lot like a propType definition because you need to tell Yup what shape the data is supposed to take.

The customization part is pretty straightforward. For the email field, Yup is looking for a string that looks like an email-pattern, and you need to have this field (it’s required).

The password schema shows that you expect a string with a minimum of 6 characters. Additionally, the user shouldn’t be able to submit the form without a password.

There are tons of options available in a schema. Look up how to use this powerful tool here.

Next up, we’ll create state for the form values. Just like earlier, this is the initial state values for each input in the form.

Next up, state for error messages.

```javascript
  // State for the error messages
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    terms: ""
  });
```
  
We’re going to change the state of the button so that when we’re filling out the form it won’t be able to submit until the validation passes. The forms will submit even if the validation is failing, we’re using the button’s state to disable the button. Ultimately though, the form state still controls wither or not the form can be submitted.

```javascript
  /* Each time the form value state is updated, check to see if it is valid per our schema. 
  This will allow us to enable/disable the submit button.*/
  useEffect(() => {
    /* We pass the entire state into the entire schema, no need to use reach here. 
    We want to make sure it is all valid before we allow a user to submit
    isValid comes from Yup directly */
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);
```

The last thing we need to do before validating the form is set up an event handler called inputChange and pass in the event parameter. React uses it’s own event system (known as a “synthetic event”). These events are meant to look like normal DOM events, and in the majority of cases we can use them in the same way. However, there are some small inconsistencies. One of those differences is the fact that we can not use the React event object in an asynchronous way on its own. If you plan on using the event object in a callback or a promise resolution you will need to call .persist() on your event object before you use it. If you are interested in learning more about why this is the case (it’s actually performance related and a good thing!) you can read about it here. Otherwise, just remember to use event.persist() and you will be good.

```javascript
  const inputChange = e => {
    /* e.persist allows us to use the synthetic event in an async manner.
    We need to be able to use it after the form validation */
    e.persist();
```
    
Finally, lets set up our validation. This is probably the trickiest part of form validation. Here, our synthetic event handler holding the forms input data will be tested against our schema from before. Then, we’ll use some conditional logic with .then and .catch to display error messages or not, and to change the state.

```javascript
    // yup.reach will allow us to "reach" into the schema and test only one part.
    // We give reach the schema as the first argument, and the key we want to test as the second.
    yup
      .reach(formSchema, e.target.name)
      //we can then run validate using the value
      .validate(e.target.value)
      // if the validation is successful, we can clear the error message
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });

    // Wether or not our validation was successful, we will still set the state to the new value as the user is typing
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
```

When validation isn’t successful we need to display an error message to the user, letting them know how to fix the problem. For an email that is less than 6 characters, for example, we might want to display “Email must be more than 6 characters.” For this, we’ll return to our form HTML and add error messages. Note that the conditional logic below is implemented with the ES6 ternary operator syntax, where a condition is listed with a ? and we use : to separate the conditions like: condition ? exprIfTrue : exprIfFalse. You can read more about ternary operators here.

```javascript
function LoginForm() {
  return (
    <form>
      <label htmlFor="email">
      <input type="email" name="email" placeholder="Email" />
      />
            {errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}
      <label htmlFor="password">
      <input type="password" name="password" placeholder="Password" />
      {errors.password.length > 6 ? (<p className="error">{errors.email}</p>) : null}
       <label htmlFor="terms">
        Do you agree to the terms and conditions?
      <input type="checkbox">
      <button>Submit!</button>
      />
    </form>
  );
}
```

Next, we will show you how to actually DO something with this beautiful form data in the form of a POST request!

Add validation to any test field from your Form Management module guided project or challenges.

Learn to make POST requests to pass data collected from a form to a database
Making elegant and excellent forms is an important skill as a developer, but we have to do something with our data once our users submit it to us. Typically, this is handled by submitting the data from the form to a database. This allows us to persist our data and access it later for use in the application to make our users’ experience better.

When our client applications need to work with data from a server and database, we transmit that data back-and-forth using HTTP. This is a protocol that allows communication between web browsers and web servers.

You’ve previously learned how to use a GET request, but we’re going to take it a step further today by submitting data to a web server. Within the HTTP protocol, a POST request is a HTTP Request Method. To be precise, it is the method that allows us to “post” (or create) information on a web server. When a user makes a POST request, they are adding data to the server’s database.

We’ll look at some examples of how to make a POST request by extending the functionality of the form that we built above.

To make our POST request to our database, we’re going to bring in axios, a promise-based library that makes it easy for us to transmit data to-and-from our web server.

First, we need to install our axios dependency. We can do that using npm:

```
npm install axios
```

Now we can write a post request anywhere in our component. Let’s look at the code we’ll write to do this.

First, here’s what an axios call looks like for POST request:

```javascript
const sentData = { data: "Hello World!" };

axios
  .post("https://yourdatabaseurlgoeshere.com", sentData)
  .then(res => {
    console.log(res.data); // Data was created successfully and logs to console
  })
  .catch(err => {
    console.log(err); // There was an error creating the data and logs to console
  });
```

Notice that we are calling the axios library but using a .post() call instead of a .get() after it. We then follow that up with a URL passed in as an argument. Unlike the .get() requests that you’ve done before, we also pass in the data that we want to send to our web server as the second argument. In this example, the data that we’re sending is our sentData variable, which is an object. This would be sent to our web server.

The promise created by axios will then resolve into a successful response or reject with an error. We’re using console.log()s here, but you will typically write logic inside of .then() and .catch() that may include:

Setting data into state in your component
Alerting the user to an error
Use the new data to create side effects in your component(s) that modify the interface for your user in some way
For instance, a POST request, such as the one above, might return a response (or res) like the following:

```javascript
{
  error: false,
  data: { data: "Hello World!" },
  message: "Your data was successfully created."
}
```

This is just a rough example, and every server works differently. You will need to initially console.log() the server’s response to find out what kind of data you’re receiving back in your response. This is super important - always console log the server’s response!

Let’s take a look at how we would integrate this POST request into our Yup form. In particular, notice what we’re doing in our handleSubmit function down towards the bottom:

#### Create a new state called setPost

This will be where we’re going to store data on a valid form submit. Once we have the data we’ll work to console.log it and display it to the screen.

```javascript
  // new state to set our post request too. So we can console.log and see it.
  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      // console.log(valid);
      setButtonDisabled(!valid);
    });
  }, [formState]);
```
  
#### Post to a database from req, res

Inside of our form submit event handler, we’re going to add a post request with axios and update formState. Once form state is filled out, this posts all of the input information to setPost.
For all of our examples together we are going to make use of the reqres API. This API allows us to make real POST requests to a real server and get real responses. Until you learn to set up your own backend in Unit 4, this will be a powerful development tool. The post to https://reqres.in/api/users accomplishes that.

```javascript
// this handles what happens when we submit the form. We want to prevent the default
  //form submission from the browser and control what happens when we submit.
  const formSubmit = e => {
    e.preventDefault();
    console.log("submitted!");
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data); // get just the form data from the REST api
        console.log("success", res);
      })
      .catch(err => console.log(err.response));
  };
```

#### Display Data

For our purposes, we’ll just display data to the DOM, instead of doing something with it on a server. For that we will use JSON.stringify to display our data in both the DOM and the console.

```javascript
/* displaying our post request data */
      <pre>{JSON.stringify(post, null, 2)}</pre>
```
      
In this example, our axios call to https://reqres.in/api/users now runs whenever we submit the form and run the handleSubmit function. Our form now takes in user data and, when the user clicks the “submit” button, it will POST the user’s data to the webserver.

This POST functionality will be reused innumerable times throughout your developer journey, so it will pay to get a handle on how you do post requests now. For further review, feel free to read through the official documentation from axios.

Go review your GET requests in previous homework assignments and think about how you convert them over to a POST request. What code would you change? How would you send your data over HTTP once you’ve converted them? What code do you need to re-write to make this happen? How do your new POST requests differ from your old GET requests?

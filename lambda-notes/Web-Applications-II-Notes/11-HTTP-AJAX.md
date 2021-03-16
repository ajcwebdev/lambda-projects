# HTTP/AJAX

## PUT/UPDATE

`PUT` is the “U” in CRUD, and it stands for `UPDATE`. We use the `PUT` method to change a resource’s information. `PUT` takes in a body object like `POST` and identifies data that needs to be updated somewhere.

```javascript
 axios     
    .put(`http://somecoolurl.com/${couldHaveDynamicId}`, updatedData)
       .then(response => {
         response is the response we get back from the server
         Whatever resource was changed should be reflected in our client
       })
       .catch(err => {
         if something goes wrong, we handle any errors here
       });
```

We are going to work on updating a quote. To set this up, we built a form for the `PUT` request. Usually, you would be in charge of populating the form fields with whichever item you are updating, but for this example, we hardcoded a quote into state. Keep in mind that in apps you build from scratch, populating the form fields may take a bit of work.

Now, in `index.js`, there is a `putMessage` function. Let’s call `axios.put` and pass in the URL. This time the endpoint will be `/quote/:id`. `:id` here is a lot like dynamic parameters in React Router. It is a dynamic variable that will be the id of whatever item you are updating. Just hardcode any number in there for this example. Also, add your `.then()` and `.catch()` and console.log the `response` and `err` inside those:

```javascript
axios
  .put(`https://lambda-school-test-apis.herokuapp.com/quotes/76`)
  .then(response => console.log(response))
  .catch(err => console.log(err));
```

Also, pass in `quote` as a parameter to `putMessage` so we have the data we need to send to the server.

```javascript
putMessage = quote => {
  axios
    .put(`https://lambda-school-test-apis.herokuapp.com/quotes/76`)
    .then(response => console.log(response))
    .catch(err => console.log(err));
};
```

Pass `putMessage` down to the `PutMovieQuoteForm` component. Then go to `PutMovieQuoteForm.js` and invoke `this.props.putMessage` with the movie quote that is one state.

### index.js

```javascript
<PutMovieQuoteForm putMessage={this.putMessage} />
```

### PutMovieQuote.js

```javascript
putMessage = e => {
  e.preventDefault();
  this.props.putMessage(this.state.movieQuote);
};
```

Now we can make some requests and check out the console logs. They are very similar to the logs we were getting in the POST section above. So we are going to handle this request like we did the POST request. On state we have `putSuccessMessage` and `putError`. Let’s set our successMessage to state in our `.then()` and the error message to state in the `.catch()`. And like before, we’ll clear out the opposite state property in each case:

```javascript
putMessage = quote => {
  axios
    .put("https://lambda-school-test-apis.herokuapp.com/quotes/76", quote)
    .then(response => {
      this.setState({
        putSuccessMessage: response.data.successMessage,
        putError: ""
      });
    })
    .catch(err => {
      this.setState({
        putSuccessMessage: "",
        putError: err.response.data.Error
      });
    });
};
```

Then pass down `putSuccessMessage` and `putError` to `PutMovieQuoteForm`, and make some requests!

```javascript
<PutMovieQuoteForm
  putMessage={this.putMessage}
  putSuccessMessage={this.state.putSuccessMessage}
  putError={this.state.putError}
/>
```

## DESTROY/DELETE

When we need to tell our server that we want some data that we’re working with deleted, we use the `DESTROY` or `DELETE` HTTP Request Method.

The `DELETE` HTTP request method is the “D” in CRUD. We use this to delete or destroy data that lives away from our webpage. When we call .delete, we’re instructing the server to remove some information somewhere. Typically we initiate deletion by sending some identifying piece of information on the URL parameter along with our requested URL string. The URL string will be a dynamic field that we’ll need to ensure matches the resource that we want to be destroyed.

REMEMBER body objects (or data) objects are to be used with PUT, POST and PATCH (we don’t need to go into patch here). Don’t expect the `axios.delete()` method to be able to take in a data object.

```javascript
  axios     
    .delete(`http://somecoolurl.com/${someDynamicId}`)
       .then(response => {
         response is the response we get back from the server
         usually on a positive response, we either re-set the state in React OR we navigate to the next page etc.
       })
       .catch(err => {
         if something goes wrong, we handle any errors here
       });
```

We are going to work on deleting a quote. To set this up, we have a quote displayed in the delete tab. In real-world apps, you would get to this page by clicking on a quote in some quotes list. On this page, there is a delete button, and in that real-world app, there may also be a way to delete a quote straight from the quote list.

There is one final thing to note. Deleting is dangerous. Often times delete buttons invoke some kind of confirmation message, usually in a modal, that asks if you are sure you want to delete that thing. We won’t worry about that here, but consider it that when you are implementing deletes in the future.

In `index.js`, there is a `deleteMessage` function. Let’s call `axios.delete` and pass in the URL. The endpoint will be `/quote/:id`. Like the put function, `:id` here is a dynamic variable that will be the id of whatever item you are deleting. Just hardcode any number in there for this example. Also, add your `.then()` and `.catch()` and console.log the `response` and `err` inside those:

```javascript
deleteMessage = () => {
  axios
    .delete(`https://lambda-school-test-apis.herokuapp.com/quotes/42`)
    .then(response => console.log(response))
    .catch(err => console.log(err));
};
```

Pass `deleteMessage` down to the `DeleteMovieQuoteForm` component. Then we’ll go to `DeleteMovieQuoteForm.js` and invoke `this.props.deleteMessage`.

### index.js

```javascript
<DeleteMovieQuoteForm deleteMessage={this.deleteMessage} />
```

### DeleteMovieQuote.js

```javascript
deleteMessage = e => {
  e.preventDefault();
  this.props.deleteMessage(this.state.movieQuote);
};
```

Now we can make some requests and check out the console logs. They are very similar to the logs we were getting in the `POST` and `PUT` sections above.

We are going to handle this request like we did with `POST` and `PUT`. On state we have `deleteSuccessMessage` and `deleteError`. Let’s set our successMessage to state in our `.then()` and the error message to state in the `.catch()`. Just like before, we’ll clear out the opposite state property in each case:

```javascript
deleteMessage = () => {
  axios
    .delete("https://lambda-school-test-apis.herokuapp.com/quotes/42")
    .then(response => {
      this.setState({
        deleteSuccessMessage: response.data.successMessage,
        deleteError: ""
      });
    })
    .catch(err => {
      this.setState({
        deleteSuccessMessage: "",
        deleteError: err.response.data.Error
      });
    });
};
```

Then pass down `deleteSuccessMessage` and `deleteError` to `deleteMovieQuoteForm`, and make some requests!

```javascript
<DeleteMovieQuoteForm
  deleteMessage={this.deleteMessage}
  deleteSuccessMessage={this.state.deleteSuccessMessage}
  deleteError={this.state.deleteError}
/>
```

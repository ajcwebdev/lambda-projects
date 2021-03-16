## Topics

* React Router
* Protected Routes
* AJAX
* Promises
* Authentication tokens

### Initialize Project

* Run `npm install` inside the root directory to install dependencies for the server.
* Run `npm start` to start the server.
* Run `npx create-react-app friends --use-npm` in a separate terminal window in the root directory of the project to create starter application.
* `cd` into _friends_ and type `npm install react-router-dom` to install dependencies.

### Project Description

* There is an API built with authentication that holds a list of friends. You can add, edit, or remove friends from the list. 
* All of the API endpoints (except login) are "protected." The API will send back a `401` error if the request does not have an authentication token in the header. 
* Once the server is up and running you'll be able to hit `http://localhost:5000` from within your app. An authentication header is needed on all calls except login.

### Endpoints offered by API in `server.js`

|Method|Endpoint|Description|
|------|--------|-----------|
|**POST**|`/api/login`|<ul><li>Returns a token to be added to the header of all other requests</li><li>Pass in credentials as the `body` of the request</li><li>`{username: 'Lambda School', password: 'i<3Lambd4'}`</li></ul>|
|**GET**|`/api/friends`|<ul><li>Returns the list of friends</li></ul>|
|**GET**|`/api/friends/123`|<ul><li>Returns the friend with the id passed as part of the URL</li></ul>|
|**POST**|`/api/friends`|<ul><li>Creates a friend and return the new list of friends. </li><li>Pass the friend as the `body` of the request</li><li>Friend is the second argument passed to `axios.post`</li></ul>|
|**PUT**|`/api/friends/:id`|<ul><li>Updates the friend using the `id` passed as part of the URL</li><li>Send object with the updated information as the `body` of the request</li><li>Object is the second argument passed to `axios.put`</li></ul>|
|**DELETE**|`/api/friends/123`|<ul><li>Removes the friend using the `id` passed as part of the URL</li></ul>|

### Login

* Add a route for a login page and build out a simple login form with username and password inputs and a submit button (design this however you would like).
* The login function should save the returned token to localStorage. You can setup `isLoading` state in your Login component, and show a spinner on your form or in your button while the login request is happening.
* When the request returns, save the token to `localStorage`, then use the history object in your Login component to navigate your user to your FriendsList route

### Private Route

* Create a `<PrivateRoute />` component to protect your other routes. It should check localStorage for a token, and redirect the user to your login route if there is not a token.
* Create a protected route for your friends list. Remember, if the user isn't logged in, navigating to this protected route will redirect them to the login page.
* In your FriendsList component, rendered with `<ProtectedRoute />`, you will create a list of your friends that you get from the API.

### Adding New Friends

* Create a form to collects data for a new friend.
* Make a POST request to add a friend to the database
* Each `friend` item that is in the `friends` array should have the following format:

```js
{
  id: 1
  name: 'Joe',
  age: 24,
  email: 'joe@lambdaschool.com',
}
```

You can create multiple "view" components for your routes such as:
* A component who's sole purpose is to render the login form
* A form for updating a user
* A component who's sole purpose is for creating users
* A component who's sole purpose is to delete a user

## Stretch Problems

* Add two more functions, one for making a PUT request, and the other for making a DELETE request
* Style the friends list and the input field
* Expand the number of properties that you put on each friend object

## Submission Format

* [ ] Submit a Pull-Request to merge `<firstName-lastName>` Branch into `main` (student's  Repo).

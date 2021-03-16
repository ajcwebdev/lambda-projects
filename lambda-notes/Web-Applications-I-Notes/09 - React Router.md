# React Router

### What is Routing?
Routing is the way we navigate through websites and web applications today. When we click on a link on any web app or website, we are routing to a URL and requesting some information that lives somewhere else.

### What is a Server?
Server are centralized resources on a network. They are physical devices, usually housed with other servers in large warehouses. They run “behind the scenes” Internet work like data storage. When you route, you’re routing to a server. For a long time, this was how the web worked. This hasn’t entirely gone away, but we now have a slightly better way of doing things.

Server-side routing is the way the web has worked for decades.
* Every link click & change of the address bar is a new request to a remote server.
* Every page load includes all page design elements, which must be re-downloaded (headers, navigation, sidebars, footers)
* The server side routing method is not very efficient.

![SPA Lifecycle](https://imagebin.ca/40yMWdOcgBfd/IC690875.png)

### Server-Side Routing
When we request information from a server (by clicking on a link or button), that server then sends back the document that was requested.
* We click on a link and our URL changes to match the request
* The server goes and finds a `template` or some `HTML` file
* It sends it back across the world wide web to deliver that content to the user

The server will refresh the web page that we’re looking at because a new request was made for information. The information given was a bunch of DOM elements that we have to re-paint the page. We can load smaller portions of the webpage as opposed to requesting/loading the entire thing the whole time the way that we do in Client-Side Routing. When requesting a lot of information your devices run through a lot of protocols. The process can be really slow, especially when bandwidth is an issue.

### Client-Side Routing
Tools like Google Chrome’s V8 Engine enable us to do things that weren’t previously possible. JavaScript is now used to maintain state (or memory) within our applications and use that memory to tell the Browser what to display when a resource is requested.

Routing that is handled internally by the JavaScript already on the page is known as **Client-side routing**.
* The page won’t refresh
* When a user clicks on a requested resource, instead of the client asking for that resource from the server via a URL, JavaScript will prevent this.
* We then get the resource (state) that is already available to us rendered out

## React Router
React Router is declarative style routing for React applications. We get a much more dynamic routing experience when building and designing our Routes within our React Apps.

### Route
Routes are a way of getting to a destination
They specify which components render on the page and in what order.

* To set up React Router, you need to declare what components will be mounted when certain URL paths are met.
* This step happens after we’ve wrapped our `Root` component in the `Router` or `BrowserRouter` component.
* Once you have React Router installed by using `npm install react-router-dom`, you can import the `Route` Component and use it within your application.

```javascript
import { Route } from 'react-router-dom';
```

The `Route` component declares what `components` will be mounted based on what `URL's` the user requests. A component `Users` will display a list of users in your system when the URL `www.coolestapp.com/users` is requested.

The `Route` component takes in a few props;
    * the URL `path` where the Route component will trigger.
    * the `component` prop that React will mount when the URL matches the requested `path`.

When `/users` is requested, the `Users` component will be mounted.

```javascript
<Route path="/users" component={Users} />
```

This route will take us to the users component whenever the /users URL is requested within our application. It’s really simple to declare routes and components that will be mounted when the routes are requested. It’s almost like your `Route` components ask you this question every single time you set one up: what component do you want mounted when a user asks for what URL path?

If you use this tool, you’ll hit each piece of your application, and how a user might interact with each component.

Picture an app that has 3 major components that will need to be rendered as part of a `Navigation` system:
* `Home`
* `Contact`
* `About`.

Each of these three components will need to be rendered when a user requests the `"/"`, `"/contact"` and `"/about"` paths in our app.

* A user requests `/` so we will mount the `Home` component
* A user requests `/contact` so we shall mount the `Contact` component
* A user requests `/about` so let us render the `About` component

```javascript
<Route path="/" component={Home}/>
<Route path="/contact" component={Contact}/>
<Route path="/about" component={About}/>
```


# Authentication and Guidelines for Password Security

Authentication is the process our API uses to verify the identity of a client trying to access a resource. Authorization comes after authentication and determines what type of access, if any, a user should have.

Adding authentication requires an API can:
* Register user accounts
* Login to prove identity
* Logout of the system to invalidate the user’s access until they login again
* Add a way for users to reset their passwords

Proper authentication is difficult. Security experts coming up with innovative ways to protect our information race against attackers coming up with ways to circumvent those security measures. Things we need to take into account when implementing authentication:
* Password storage
* Password strength
* Brute-force safeguards

## Password Storage

The rule of thumb is: NEVER, EVER store user passwords in plain text. There are two main options.

### Encryption

Encryption goes two ways. First, it utilizes plain text and private keys to generate encrypted passwords and then reverses the process to match to an original password.

### Hashing

Cryptographic hashes only go one way: parameters + input = hash. It is pure; given the same parameters and input it generates the same hash.

## Password Strength

Password length alone is not enough to slow password guessing, but in general, long passwords are better than short, complicated passwords. It is a trade-off between convenience and security.

## Brute-force Safeguards

A common way that attackers circumvent hashing algorithms is by pre-calculating hashes for all possible character combinations up to a particular length using common hashing techniques. The results of said calculations are stored into a database table known as a rainbow table. Whenever there is a breach, the attacker checks every breached password against their table.

Which Cryptographic Hashing Algorithm should we use?
* MD5
* SHA-1
* SHA-2
* SHA-3

None of these, because they are flawed, these algorithms are optimized for speed, not security. We aim to slow down hackers’ ability to get at a user’s password. To do so, we are going to add time to our security algorithm to produce what is known as a key derivation function.

Hash + Time = Key Derivation Function

# Hash passwords before saving them to the database

When storing a user’s password into a database we must ensure that they are not saved as plain text. Instead of writing our own key derivation function (fancy name for hashing function), we’ll use a well known and popular module called [bcryptjs](https://www.npmjs.com/package/bcryptjs). Bcryptjs features include:
* password hashing function
* implements salting both manually and automatically
* accumulative hashing rounds

Having an algorithm that hashes the information multiple times (rounds) means an attacker needs to have the hash, know the algorithm used, and how many rounds were used to generate the hash in the first place.

Install `bcrypt` using npm

```
npm install bcrypt
```

Import it into your server.

```javascript
const bcrypt = require('bcryptjs');
```

To hash a password:

```javascript
const credentials = req.body;

const hash = bcrypt.hashSync(credentials.password, 14);

credentials.password = hash;

// move on to save the user.
```

To verify a password:

```javascript
const credentials = req.body;

// find the user in the database by it's username then
if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
  return res.status(401).json({ error: 'Incorrect credentials' });
}

// the user is valid, continue on
```

# Verify passwords using bcrypt

We have established that passwords must be hashed before they are persisted to the data storage, but when users attempt to login, they provide a password guess in plain text. We need a way to validate the provided plain text password against the hash that was stored when the user registered.

Use `bcrypt.compareSync()`, passing the password guess in plain text and the password hash from the database to validate credentials. If the password guess is valid, the method returns true. Otherwise, it returns false. The library hashes the password guess first and then compare the hashes.

```javascript
server.post('/api/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      // check that passwords match
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        // we will return 401 if the password or username are invalid
        // we don't want to let attackers know when they have a good username
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}); 
```

# In-memory sessions to persist authentication information across requests

Sessions are commonly used to allow a server to store information about a client. That information can then be used for a variety of purposes. We’ll use it to persist authentication information so there is no need to re-enter credentials on every new request the client makes to the server.

Sessions provide a way to persist data across requests. We’ll use them to save authentication information, so there is no need to re-enter credentials on every new request the client makes to the server. When using sessions, each client will have a unique session stored on the server. Now that we have a solution for keeping authentication information, we need a way to transmit that information between the client and server. For that, we’ll use cookies.

## Authentication Workflow for sessions

The basic workflow when using a combination of cookies and sessions for authentication is:
* Client sends credentials
* Server verify credentials
* Server creates a session for the client
* Server produces and sends back cookie
* Client stores the cookie
* Client sends cookie on every request
* Server verifies that cookie is valid
* Server provides access to resource

To understand how cookies are transmitted and stored in the browser, we need to look at the basic structure of an HTTP message. Every HTTP message, be it a request or a response, has two main parts: the headers and the body. The headers are a set of key/value stores that include information about the request. There are several standard headers, but we can add our own if needed.

To send cookies, the server adds the `Set-Cookie` header to the response like so: `"Set-Cookie": "session=12345"`. Notice how the value of a header is just a string. The browser will read the header and save a cookie called `session` with the value `12345` in this example. We will use a library that takes care of creating and sending the cookie.

The body contains the data portion of the message. The browser will add the `"Cookie": "session=12345"` header on every subsequent request and the server. Cookies are not accessible from JavaScript or anywhere because they are cryptographically signed and very secure.

Llibraries for handling sessions in Node.js include:
* [client-sessions](https://www.npmjs.com/package/client-sessions)
* [express-session](https://www.npmjs.com/package/express-session)

Common ways to store session data on the server:
* Memory
* Memory cache (like Redis and Memcached)
* Database

### Cookies
* Automatically included on every request
* Unique to each domain + device pair
* Cannot be sent to a different domain
* Sent in the cookie header
* Has a body that can have extra identifying information
* Max size around 4KB

### Storing session data in memory
* Data stored in memory is wiped when the server restarts
* Causes memory leaks as more and more memory is used as the application continues to store data in session for different clients
* Good for development due to its simplicity

### Using cookies to transfer session data

Advantages when using cookies:
A cookie is a small key/value pair data structure that is passed back and forth between client and server and stored in the browser. The server uses it to store information about a particular client/user. Workflow for using cookies as session storage:
* the server issues a cookie with an expiration time and sends it with the response
* browsers automatically store the cookie and send it on every request to the same domain
* the server can read the information contained in the cookie (like the username)
* the server can make changes to the cookie before sending it back on the response
* rinse and repeat

Express-session uses cookies for session management. Drawbacks when using cookies:
* Small size, around 4KB
* Sent in every request, increasing the size of the request if too much information is stored in them
* If an attacker gets a hold of the private key used to encrypt the cookie, they could read the cookie data

### Storing session data in Memory Cache (preferred way of storing sessions in production applications)
* stored as key-value pair data in a separate server.
* the server still uses a cookie, but it only contains the session id.
* the memory cache server uses that session id to find the session data.

Advantages:
* Quick lookups.
* Decoupled from the API server.
* A single memory cache server can serve many applications.
* Automatically remove old session data.

Drawbacks:
* another server to set up and manage.
* extra complexity for small applications.
* hard to reset the cache without losing all session data.

### Storing session data in a database
* Similar to storing data in a memory store.
* The session cookie still holds the session id.
* The server uses the session id to find the session data in the database.
* Retrieving data from a database is slower than reading from a memory cache.
* Causes chatter between the server and the database.
* Need to manage/remove old sessions manually or the database will be filled with unused session data. Most libraries now manage this for you.

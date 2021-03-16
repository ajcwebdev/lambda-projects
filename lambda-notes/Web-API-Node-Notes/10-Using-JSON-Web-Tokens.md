# Three Parts of a JSON Web Token

We can use JSON web tokens (JWTs) to add authentication to a Web API. JSON web tokens are an industry standard for transferring data between two parties. JWTs are cryptographically signed, typically using a secret with the HMACSHA-256 algorithm.

JSON Web Tokens (JWT) are a way to transmit information between parties in the form of a JSON object. The JSON information is most commonly used for authentication and information exchange. In the former example, with authentication every JWT contains information. In the latter, JWTs contain the classic JSON data you’ve seen before.

Ultimately, a JWT is a string that has three parts separated by a period (`.`). Those are:
* Header
* Payload
* Signature

## Header

The header contains the algorithm with the token type. Typically the header for a JWT looks like this.

```javascript
{
  "alg": "HS256",
  "typ": "JWT"
}
```

The `alg` key specifies which algorithm was used to create the token, in this case, the algorithm is HMACSHA-256, and the `typ` property classifies this token as being of the type JWT.

## Payload

The payload includes claims (fancy name for things like permissions for the user) information or any other data we’d like to store in the token, which is most likely a user id. There are specific claims defined in the JWT standard, and you can also add custom properties to this object.

```javascript
{
  "sub": "1234567890", // standard - subject, normally the user id
  "name": "John Doe", // custom property
  "iat": 1516239022 // standard - The Date the token was issued, expressed in seconds since epoch.
}
```

## Signature

To create a signature, we must create a string by base64 encoding the header and payload together, and then signing it with a secret. Combining all three parts, you will get a JWT that looks like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

# Produce and send a JSON Web Token

To produce and verify the token, we’ll use the `jsonwebtoken` npm module. Let’s produce and send a token on a successful login.
* Add `jsonwebtoken` to the project and require it into `auth-router.js`
* Change the `/login` endpoint inside the `auth-router.js` to produce and send the token

```javascript
// ./auth/auth-router.js

const jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)

        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token,
        })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }

  const options = {
    expiresIn: '1d',
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}
```

Add the `./config/secrets.js` file to hold the `jwtSecret`

```javascript
module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'add a third table for many to many',
}
```

Require `secrets.js` into `auth-router.js`: `const secrets = require('../config/secrets.js');`
* Login with the student/hired user and show the token
* Review the steps taken one more time

We have a server that can produce and send JWTs on a successful login.

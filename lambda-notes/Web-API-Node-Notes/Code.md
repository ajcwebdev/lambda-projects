# Node.js Server

```javascript
const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World from Node\n')
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
```

## Express Server

```javascript
const express = require('express')

const server = express()

server.get('/', (req, res) => {
    res.send('Hello from Express')
})

server.listen(5000, () =>
    console.log('Server running on http://localhost:5000')
)
```

# Create an API that can respond to GET requests

```javascript
const express = require('express')

const server = express()

server.get('/', (req, res) => {
    res.send('Hello World')
})

server.listen(8000, () =>
    console.log('API running on port 8000')
)
```

```javascript
server.get('/hobbits', (req, res) => {
    // route handler code here
})
```

```javascript
const hobbits = [
  {
    id: 1,
    name: 'Samwise Gamgee',
  },
  {
    id: 2,
    name: 'Frodo Baggins',
  },
]
```

```javascript
res.status(200).json(hobbits)
```

```javascript
const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Hello World')
})

server.get('/hobbits', (req, res) => {

    const hobbits = [
      {
        id: 1,
        name: 'Samwise Gamgee',
      },
      {
        id: 2,
        name: 'Frodo Baggins',
      },
    ]

    res.status(200).json(hobbits)
})

server.listen(8000, () =>
    console.log('API running on port 8000')
)
```

### Request handler executes when making a `GET` request to `/about`

```javascript
server.get('/about', (req, res) => {
    res.status(200).send('<h1>About Us</h1>')
})
```

### Request handler executes when making a `GET` request to `/contact`

```javascript
server.get('/contact', (req, res) => {
    res.status(200).send('<h1>Contact Form</h1>')
})
```

### Request handler executes when making a `POST` request to `/hobbits`

```javascript
server.post('/hobbits', (req, res) => {
    res.status(201).json({ url: '/hobbits', operation: 'POST' })
})
```

### Request handler executes when making a `PUT` request to `/hobbits`

```javascript
server.put('/hobbits', (req, res) => {
    res.status(200).json({ url: '/hobbits', operation: 'PUT' })
})
```

### Request handler executes when making a `DELETE` request to `/hobbits`

```javascript
server.delete('/hobbits', (req, res) => {
    res.status(204)
})
```

## Reading and Using Route Parameters

```javascript
server.delete('/hobbits/:id', (req, res) => {
    const { id } = req.params
    res.status(200).json({
        url: `/hobbits/${id}`,
        operation: `DELETE for hobbit with id ${id}`,
    })
})
```

## Using the Query String

```javascript
server.get('/hobbits', (req, res) => {
    const sortField = req.query.sortby || 'id'
    const hobbits = [
      {
        id: 1,
        name: 'Samwise Gamgee',
      },
      {
        id: 2,
        name: 'Frodo Baggins',
      },
    ]

    const response = hobbits.sort(
        (a, b) => (a[sortField] < b[sortField] ? -1 : 1)
    )

    res.status(200).json(response)
})
```

## Reading Data from the Request Body

```javascript
server.use(express.json())

let hobbits = [
  {
    id: 1,
    name: 'Bilbo Baggins',
    age: 111,
  },
  {
    id: 2,
    name: 'Frodo Baggins',
    age: 33,
  },
]

let nextId = 3
```

### Modify Post Endpoint

```javascript
server.post('/hobbits', (req, res) => {
    const hobbit = req.body
    hobbit.id = nextId++

    hobbits.push(hobbit)

    res.status(201).json(hobbits)
})
```

```javascript
{
    "name": "Samwise Gamgee",
    "age": 30
}
```

## Implement Update Functionality

```javascript
server.put('/hobbits', (req, res) => {
    res.status(200).json({ url: '/hobbits', operation: 'PUT' })
})
```

```javascript
server.put('/hobbits/:id', (req, res) => {
    res.status(200).json({ url: '/hobbits', operation: 'PUT' })
})
```

```javascript
server.put('/hobbits/:id', (req, res) => {
    const hobbit = hobbits.find(h => h.id == req.params.id)

    if (!hobbit) {
        res.status(404).json({ message: 'Hobbit does not exist' })
    } else {
        Object.assign(hobbit, req.body);

        res.status(200).json(hobbit)
    }
})
```

# Use Express Routers to organize Web API code

```javascript
const express = require('express')

const server = express()

server.use('/', (req, res) =>
    res.send('API up and running!')
)

server.listen(8000, () =>
    console.log('API running on port 8000')
)
```

```javascript
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('hello from the GET /users endpoint')
})

router.get('/:id', (req, res) => {
    res.status(200).send('hello from the GET /users/:id endpoint')
})

router.post('/', (req, res) => {
    res.status(200).send('hello from the POST /users endpoint')
})

module.exports = router
```

```javascript
const express = require('express')

const userRoutes = require('./users/userRoutes')
const productRoutes = require('./products/productRoutes')
const clientRoutes = require('./clients/clientRoutes')

const server = express()

server.use('/users', userRoutes)
server.use('/products', productRoutes)
server.use('/clients', clientRoutes)

server.listen(8000, () =>
    console.log('API running on port 8000')
)
```

```javascript
const express = require('express')

const apiRoutes = require('./api/apiRoutes')

const server = express()

server.use('/api', userRoutes)

server.listen(8000, () =>
    console.log('API running on port 8000')
)
```

```javascript
const express = require('express')

const userRoutes = require('./users/userRoutes')
const productRoutes = require('./products/productRoutes')
const clientRoutes = require('./clients/clientRoutes')

const router = express.Router()

router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/clients', clientRoutes)

module.exports = router
```

```javascript
const express = require('express')

const server = express()

server.use('/', (req, res) =>
    res.send('API up and running!')
)

server.listen(9000, () =>
    console.log('API running on port 9000')
)
```

```javascript
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    const races = ['human', 'elf', 'hobbit', 'wizard', 'dwarf', 'orc']

    res.status(200).json(races)
});

module.exports = router
```

```javascript
const express = require('express')
const raceRoutes = require('./races/raceRoutes')

const server = express()

server.use('/races', raceRoutes)

server.use('/', (req, res) =>
    res.send('API up and running!')
)

server.listen(9000, () =>
    console.log('API running on port 9000')
)
```


# Different Types of Middleware

```javascript
function(req, res) {
    res.status(404).send("Ain't nobody got time for that!")
}
```

```javascript
server.use(function(req, res) {
    res.status(404).send("Ain't nobody got time for that!")
})
```

# Custom Middleware

```javascript
function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
            'Origin'
        )}`
    );

    next()
}
```

```javascript
server.use(logger)
```

```javascript
function atGate(req, res, next) {
    console.log('At the gate, about to be eaten`)

    next()
}
```

```javascript
server.use(atGate)
```

```javascript
function auth(req, res, next) {
    if (req.url === '/mellon') {
        next()
    } else {
        res.send('You shall not pass!')
    }
}
```

```javascript
server.get('/mellon', auth, (req, res) => {
    console.log('Gate opening...')
    console.log('Inside and safe')
    res.send('Welcome Traveler!')
})
```

# Error Handling Middleware

```javascript
const express = require('express')
const path = require('path')

const server = express()

server.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'index.html')
    res.sendFile(filePath)
})

server.listen(5000)
```

```javascript
server.get('/download', (req, res, next) => {
    const filePath = path.join(__dirname, 'index.html')
    res.sendFile(filePath, err => {
        if (err) {
            next(err)
        } else {
            console.log('File sent successfully')
        }
    })
})
```

```javascript
server.use((err, req, res, next) => {
    console.error(err)

    res
        .status(500)
        .json({ message: 'There was an error performing the required operation' })
})
```

```javascript
const express = require('express')
const path = require('path')

const server = express()

server.get('/download', (req, res, next) => {
    const filePath = path.join(__dirname, 'index.html')
    res.sendFile(filePath, err => {
        if (err) {
            next(err)
        } else {
            console.log('File sent successfully')
        }
    })
})

server.use((err, req, res, next) => {
    console.error(err)

    res
        .status(500)
        .json({ message: 'There was an error performing the required operation' })
})

server.listen(5000)
```

# Extract configuration into environment variables

## Configure a `server` Script

```javascript
"server": "nodemon index.js"
```

## Add `start` Script

```javascript
"scripts": {
    "start": "node index.js",
    "server": "nodemon index.js"
},
```

## Make the Port Dynamic

```javascript
require('dotenv').config()

const server = require('./api/server.js')

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`)
})
```

```
PORT=4000
```

# Deploy a Web API to Heroku

```javascript
{
  "shout": "to all students for successfully deploying an empty array for the world to see and marvel!"
}
```

## Add an Environment Variable on Heroku

```javascript
server.get('/', async (req, res) => {
    try {
        const shoutouts = await db('shoutouts')
        const messageOfTheDay = process.env.MOTD || 'Hello World!'
        res.status(200).json({ motd: messageOfTheDay, shoutouts })
    } catch (error) {
        console.error('\nERROR', error)
        res.status(500).json({ error: 'Cannot retrieve the shoutouts' })
    }
})
```

```
PORT=4000
MOTD=Hello from my computer
```

# Extract configuration into environment variables

Most development pipelines include different environments that often include development, testing and production. It’s recommended to extract away any values that need to change between environments, like database connections.

When you develop and run code on your machine, you are running code in its development environment.

Most companies will have a testing environment that is more similar to production; it has the same versions of software and runs on similar, albeit weaker, hardware. They do this to mitigate the risks when moving the to production servers that clients use.

Ideally, all environments run on the same stack, platforms, and versions. Still, it is common to have developers on the Windows platform with the latest version of Node.js and the production server running on Linux with the last stable version of Node.js. For those cases, it is important to have a testing/staging environment that also runs the Linux and Node.js versions found on the production server. A staging environment can help to detect any regressions that may occur during deployment before code reaches the user.

## Configure a `server` Script

The server is not configured to run when typing `npm run server`. It is also not using `nodemon` to restart on changes. Let’s configure both.
* Add `nodemon` as a development time dependency: `npm install -D nodemon`
* Open `package.json` and modify the `test` script to read

```javascript
"server": "nodemon index.js"
```

When we deploy the API, Heroku is going to look for a `start` script that uses `node` to run the server. We need to add that script to `package.json`.

## Add `start` script

Add a `start` script that uses `node` instead of `nodemon` to run `index.js`. The `scripts` section of `package.json` should look like so:

```javascript
"scripts": {
    "start": "node index.js",
    "server": "nodemon index.js"
  },
```

After this change, heroku knows how to start our server but, needs to be in control of which `port` the API will use. The port is hard-coded as 4,000, and we need to make it dynamic.

## Make the Port Dynamic

* Introduce `process.env`.
* Install `dotenv` as a production dependency.
* Change `index.js`:

```javascript
// it's recommended to load configuration for .env as early as possible
require('dotenv').config(); // add this line as the first thing to run1

const server = require('./api/server.js');

// we'll read the port from the server environment if it is there
// heroku will have the PORT environment variable set
const port = process.env.PORT || 5000;

// we can now use that port, if set up by heroku or read from .env or 5000 as a default if not set
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
```

Add a `.env` file to the root folder (next to `package.json`) with the following content:

```
PORT=4000
```

It is recommended to add `.env` to `.gitignore` to prevent it from being uploaded to GitHub.

The reason is that most systems add configuration secrets to that file that are different between environments. Some examples are database connection credentials or API keys for external services.

* Stop the server and restart it again, or the change to `.env` will not be detected.
* The API should be using port 4000 now as specified in `.env`.

# Deploy a Web API to Heroku

I want to start off by saying that the subject of dev ops and deployment is by no means in the same realm as software development or computer science. You can think of it more as a necessary byproduct of building on software. Just like when creating any sort of product, you need to figure out how you’re going to get that product to the end users or consumers. The be-all-end-all of dev ops is to achieve this exact goal. So how is this process done?

The short answer is: it depends on what you want to deploy. If you want to simply deploy a static HTML site that has no reliance on things like a node server or a database, that can easily be handled by the myriad of hosting services out there. Even if your application does rely on a database and a node server, configuring a virtual machine from Digital Ocean to act as the server that houses your application is also a viable strategy when it comes to deploying and hosting.

If we’re writing all of this amazing code, and building these beautiful tools for users to interact with, it does us no good until users have our projects in their hands. The way to do this is to deploy our code to existing sites.

Setup Continuous Deployment from GitHub
* Login to heroku and create an app.
* In the Deploy tab, select GitHub in the Deployment Method section.
* GitHub will be ask to authorize access to heroku, approve access.
* Search for the repository (their fork of the starter code) in the Connect to GitHub section and click Connect.
* In the Automatic deploys section, pick the `main` branch and click Enable Automatic Deploys.
  * Note that Heroku automatically deploys to `master`. We strongly encourage you to use a `main` branch instead. You can override this automatic deployment using `git push -f heroku main:master`
* In the Manual deploy section, click on Deploy Branch to kick-start the first deploy.
* Scroll to the top and move to the Overview tab to see the deployment in action.
* On the top right, click Open App.

The deployment succeeded, but opening the App fails because the fork on GitHub still has the old code without the dynamic port and new `start` script.

Our application displays Application Error and information on how to open the logs. We can fix it by pushing our changes to the main branch on GitHub.
* Commit and push the changes to the forked repository on GitHub
* Check the Overview tab on Heroku and wait for the message that the application was deployed.
* Refresh the browser where the application is running, and there should be an empty array. Success!

Use Postman to connect to the API and post a few shoutouts to people that deserve it. An example:

```javascript
{
  "shout": "to all students for successfully deploying an empty array for the world to see and marvel!"
}
```

## Add an Environment Variable on Heroku

Change the GET to `/` endpoint to include a message of the day as part of the response.

```javascript
server.get('/', async (req, res) => {
  try {
    const shoutouts = await db('shoutouts');
    const messageOfTheDay = process.env.MOTD || 'Hello World!'; // add this line
    res.status(200).json({ motd: messageOfTheDay, shoutouts }); // change this line
  } catch (error) {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot retrieve the shoutouts' });
  }
});
```

Add the MOTD to the `.env` file.

```
PORT=4000
MOTD=Hello from my computer
```

* restart the server running on localhost.
* make a request to the api running on localhost to verify that the `motd` property is there.
* commit and push to GitHub.
* once the new changes are deployed, refresh the application on heroku. Note that we get the default `Hello World!` message because the environment variable does not exist on heroku.

Now we are going to add that configuration variable on Heroku.

* on heroku, go to the Settings tab.
* click on Reveal Config Vars in the Config Vars section.
* add a `MOTD` config var with the value “Hello from the World Wide Web”
* refresh the application.

Note the environment variable on heroku overrides the value in code and the value in our local `.env` file. Environment variables can be used to store API keys, database connection information, and any other secrets in a more secure manner.

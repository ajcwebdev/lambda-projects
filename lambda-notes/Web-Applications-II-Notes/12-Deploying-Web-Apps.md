The world wide web is a part of the internet - which is itself a network of interconnected computers. The web is just one way to share data over the internet. It consists of a body of information stored on web servers, ready to be shared across the world.

## Web Servers

The term “web server” can mean
1) a computer that stores the code for a website
2) a program that runs on such a computer.

The physical computer device is connected to the internet and stores the code for different websites. When we load the code for our websites the server is “hosting” our website/app. The software program "serves" web pages from the project's code to users upon request.

While hosting websites has traditionally been a fairly involved task, nowadays, it is quicker than it ever has been before. Gone are the days of setting up a server program through services like Apache, or Window’s IIS, then renting the physical server space from a large company, or buying server hardware.

### How Servers Share Info

#### Domain Names and URLs

In 1984, a couple decades after the first computers and networks were invented, the Domain Name Service (DNS) was introduced. This was a concept where computers could distinguish themselves from one another. Six domains that you will probably recognize were introduced: edu (Education), gov (Government), mil (Military), com (Commercial), net (Network Resources), and org (Organization).

Just a few short years later, in 1991, the worldwide web network was opened to the world and incorporated the new HTML computer language. HTML uses specifications for Uniform Resource Locators (URLs). These URLs became (and remain) the universal standard for locating website addresses.

By definition, a URL is a formatted text string referring to the location of a resource on a computer network (most commonly the web). Typically, these resources are web pages, but they can also be text documents, graphics, programs, or pretty much anything that can be stored digitally.

Combining this all together, we learn that computers can connect to the internet via the world wide web, locate a specific server computer through a URL and domain name, and retrieve information or resources from that server.

### Web App Deployment

Web apps are made up of code - mostly JavaScript. When we want to deploy our web app to the world wide web, we need to host that project on a web server so that it can be served up to people connected to the web. There are many services that allow you to “rent” server space for your web app. You can deploy web apps to Amazon AWS servers, Google Servers, Netlify, Heroku, Gatsby, Github Pages, and Vercel (which we’ll learn about in this module) among many, many others.

Services like these are a huge step up in modern technology that allows us to deploy sites with the click of a button or right in your terminal. We are lucky today that we can do this with so much ease, at least compared to the “good ol’ days”.

#### Static vs Dynamic Apps

Deploying a static web app is a little different than deploying a dynamic web app. Most of the apps that you have built up to this point are static apps. A basic definition of a static site is one that has hardcoded data that doesn’t change. A lot of our React apps use data from third-party libraries abut still deploy like a static app.

Deploying a site with an accompanying server and database is going to be more complicated than just an almost static site that consumes a third-party API. We’ll learn more about that kind of deployment in the backend unit.

### Account Creation & Onboarding

Let’s start by creating a new Vercel account. You can make a new account by logging in with GitHub. You’ll immediately be taken through an onboarding flow, as shown below.

Fill out your information, upload an avatar, and proceed to installing the GitHub integration.

Click the Setup Now For GitHub button and you’ll be taken to GitHub to finish the installation process. If you are a part of other GitHub organizations, you’ll be given all the different organizations that you can install the integration for. Most likely, you only have a personal account, so go ahead and install it there.

You’ll then be given the option to install the integration for all of your repositories, or select repositories. You’ll want to enable this for everything because you always have control over whether or not you want to deploy a repository or not from the Vercel dashboard.

After you install the integration, you’ll be taken back to the onboarding flow where you should see a success message like the one shown below.

Finally, you’ll be taken to the last part of your onboarding process, which is to deploy one of the starter templates. Select the `React` starter to deploy a `create-react-app` template.

You’ll then be taken to a page where you can name the project. Feel free to change it to whatever you wish.

If you do change the Vercel project name, it’s a good idea to also change the GitHub repository name to keep things consistent.

GitHub repositories are checked private by default, but if you want to share your work with your classmates and instructors you should uncheck this.

Upon creating your project, you’ll be taken to the project overview page where you’ll find all your deployments for the project. If you initially see a message that says “No deployments found in this project.”, ignore that and refresh the page. You should find a URL for your deployment. Click it and you’ll be taken to the deployment overview page, where you can find build logs and runtime logs.

Give your deployment about a minute to finish building and refresh the page. You should see a preview screenshot as well as a READY status. Congratulations on your first deployment! Click on the image preview or the blue Visit button and you’ll be taken to your deployment.

# Intro to Node.js

## Recap

### What is a server?

A computer with a high computational power waiting for requests.

### TCP Server

You need the address and port of the server

you are able to connect

once you're connected, you can send many messages to the server

the server can send many messages to you

you stay connected unless you want to disconnect or the server removes/kick you out

### HTTP Server

You need the address and the port of the server

once you're connected, you can send a SINGLE message to the server

the server MUST reply back to you with a single message

you then disconnect

### Status codes

[Status code list](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

- 2xx - Success
  - 200 - Ok
  - 201 - Created
- 3xx - Redirect
  - 304 - Not modified
- 4xx - Client eror (you messed up!)
  - 401 - Unauthorized
  - 402 - Payment required
  - 404 - Not Found
- 5xx - Server Error
  - 503 - Service Unavailable

### What is a callback function?

Function that is passed as a parameter of another function.

## Early in days

- JS was able to run **only in the browser**.
- Brilliant idea to build a runtime enviroment.

## What is Node?

- It's not a language or a framework.
- It's a **runtime enviroment** built on the same JS engine as browser called **V8 Engine**

## Why Node?

- Fast, efficient and highly scalable
- Event driven, non-blocking I/O model
- Popular in the industry
- Same language on the front and back end (JS)

## WTH is Non-blocking I/O?

- Basically means that node is asynchronous by default
- Works on a single thread
- Support tens of thousands concurrent connections
- Optimizes throughout and scalability in apps with many operatiions
- All of this makes Node.js apps very efficient

## What can we do with Node?

- REST API
- Real Time Services
- CRUD (Create, Read, Update, Delete) Apps
- Tools & Utilities
- Anything that is not CPU intensive

## Node Apps

- Many applications are built on top of Node:
  - React.js
  - Angular.js
  - Vue.js
  - Electron
  - Express

## NPM

- Stands for Node Package Manager
- Install 3rd party packages (frameworks, libraries, tools, etc)
- Packages get stored in the _"node_modules"_ folder
- All dependencies are listed in a _"package.json"_ file.
- NPM scripts can be created to run certain tasks such as run a server

### Common npm scripts

```
npm init
```

initialize the package manager and creates the package.json file

```
npm install <packageName>
```

install the package in the project

```
npm install -g <packageName>
```

install the package globally

```
npm install -D <packageName>
```

install package only for development environment

## Node Core Modules

There are many modules/packages that are included that you can use without installing it.

- http - includes classes, methods and events to create Node.js HTTP server.
- url - includes methods for URL resolution and parsing
- querystring - includes methods to deal with query string
- path - includes methods to deal with file paths
- fs - includes classes, methods and events to work with files
- util - includes utility functions useful for programmers

## Importing and Exporting

Node does not support ES6 import and export by default, so we have to use require and modules.exports to pass instances between files.

```js
// ES5
const EventEmitter = require("events");

module.exports = new EventEmitter();
```

```js
// ES6
import EventEmitter from "events";

export default new EventEmitter();
```

## How to create a server

```js
const http = require("http");

const server = http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<h1>Hello World</h1>");
    response.end();
  })
  .listen(3000, () => console.log("Server listening on port 3000"));
```
# Web Sockets

## What are Web Sockets?

Web Sockets are a way for a client to communicate with a server over a persistent connection. This is different from HTTP, which is a request-response protocol. With Web Sockets, the client and server can send messages to each other at any time.

## Why are Web Sockets useful?

Web Sockets are useful for applications that need to communicate with the server in real time. For example, a chat application needs to be able to send messages to the server and receive messages from the server at any time. Web Sockets are also useful for games, where the client needs to be able to send input to the server and receive updates from the server at any time.

## How do Web Sockets work?

- Web Sockets are built on top of the HTTP protocol.
- When a client wants to open a Web Socket connection, it sends an HTTP request to the server.
- The server responds to the request with an HTTP response that includes a special header called `Upgrade`.
- The client then sends a special message to the server called a "handshake" message.
- The server responds to the handshake message with another handshake message. After this, the client and server can send messages to each other at any time.

## How do we use Web Sockets in our applications?

- We use a library called `socket.io` to implement Web Sockets in our applications.
- `socket.io` is a library that wraps Web Sockets and makes them easier to use.
- `socket.io` is built on top of the Node.js `http` module, so we can use it in our Express applications.

## How do we use `socket.io` in our applications?

- We can use `socket.io` in our Express applications by adding the following code to our server:

```js
const express = require("express");
const htttp = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```

- We can then use `io` to listen for and emit events:

```js
io.on("connection", (socket) => {
  console.log("A client has connected");

  socket.on("disconnect", () => {
    console.log("A client has disconnected");
  });
});
```

- We can use `io` to send messages to all connected clients:

```js
io.emit("message", "Hello, world!");
```

- We can use `socket` to send messages to a specific client:

```js
socket.emit("message", "Hello, world!");
```

- We can use `socket.broadcast` to send messages to all connected clients except for a specific client:

```js
socket.broadcast.emit("message", "Hello, world!");
```

## How do we use `socket.io` in our client-side code?

- We can use `socket.io` in our client-side code by adding the following code to our HTML:

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();
</script>
```

- We can then use `socket` to listen for and emit events:

```js
socket.on("message", (message) => {
  console.log(message);
});

socket.emit("message", "Hello, world!");
```

## Rooms in `socket.io`

- We can use `socket.io` to create rooms, which are groups of clients that can communicate with each other.

- We can create a room by calling `socket.join`:

```js
socket.join("room");
```

- We can use `io` to send messages to all connected clients in a specific room:

```js
io.to("room").emit("message", "Hello, world!");
```

- We can use `io` to send messages to all connected clients in a specific room except for a specific client:

```js
socket.broadcast.to("room").emit("message", "Hello, world!");
```

## Exercise

- Implement a multiplayer game using Web Sockets in our Tic Tac Toe game.
- Bonus: Create rooms for different games.

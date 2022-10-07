const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const moment = require("moment");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  const { username, room } = socket.handshake.query;
  console.log("A client has connected", username);
  socket.join(room);
  io.to(room).emit("welcome_message", {
    username: "Chat Bot",
    text: `${username} joined`,
    time: moment().format("hh:mm a"),
  });

  socket.on("message", (message) => {
    console.log("message in server", message);
    io.to(room).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A client has disconnected");
    io.to(room).emit("message", {
      username: "Chat Bot",
      text: `${username} disconnected`,
    });
  });
});

const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

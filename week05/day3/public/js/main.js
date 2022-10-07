const params = new URL(document.location).searchParams;
console.log("params", params);
const username = params.get("username");
const room = params.get("room");

console.log("username", username);
const socket = io({
  query: { username: username, room: room },
});

const messageForm = document.getElementById("message-form");
console.log("message form", messageForm);
const messageInput = document.getElementById("messageInput");
const messagesDiv = document.getElementById("messages");
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = {
    username,
    text: messageInput.value,
  };
  socket.emit("message", message);
});

socket.on("message", (message) => {
  console.log("message received", message);
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<div class="message">
  <div class="message__author">${message.username}</div>
  <div class="message__text">${message.text}</div>
</div>`;
  messagesDiv.appendChild(messageDiv);
});

socket.on("welcome_message", (message) => {
  console.log("message received", message);
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<div class="message">
  <div class="message__author">${message.username} : ${message.time}</div>
  <div class="message__text">${message.text}</div>
</div>`;
  messagesDiv.appendChild(messageDiv);
});

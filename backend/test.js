// THIS IS THE CODE ON THE GLITCH
const WebSocket = require("ws");
const PORT = 5000;

const wsServer = new WebSocket.Server({
  port: PORT,
});

wsServer.on("connection", function (socket) {
  console.log("Client connected");

  socket.on("message", function (msg) {
    console.log("Received message" + msg);
  });
});

const WebSocket = require("ws");

let wss = null;

function initWebSocket(server) {
  console.log("Initializing WebSocket server...");

  if (wss) return wss;

  wss = new WebSocket.Server({ server });

  wss.on("connection", (socket, request) => {
    const ip = request.socket.remoteAddress;

    socket.on("message", (message) => {
      console.log("Received message:", JSON.stringify(message));
    });

    socket.on("error", (error) => {
      console.error(`WebSocket error from client ${ip}: ${error.message}`);
    });

    socket.on("close", () => {
      console.log("Client disconnected from WebSocket server");
    });

  });

  wss.on("error", (error) => {
    console.error("WebSocket server error:", error);
  });

  wss.on("close", () => {
    console.log("WebSocket server closed");
    wss = null;
  });

  return wss;
}

function broadcast(data) {
  if (!wss) return;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

function unicast(data) {
  if (!wss) return;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

module.exports = {
  initWebSocket,
  broadcast,
};

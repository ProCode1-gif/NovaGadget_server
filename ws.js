const WebSocket = require("ws");

let wss = null;

function initWebSocket(server) {
  console.log("Initializing WebSocket server...");

  // Prevent creating multiple WebSocket servers
  if (wss) {
    console.log("WebSocket server already initialized");
    return wss;
  }

  wss = new WebSocket.Server({ server });

  console.log("WebSocket server is ready");

  wss.on("connection", (socket, request) => {
    const ip = request.socket.remoteAddress;
    console.log("Client connected to WebSocket server");

    socket.on("message", (message) => {
      console.log("Received message:", message.toString());
    });

    socket.on("error", (error) => {
      console.error(`WebSocket error from client ${ip}: ${error.message}`);
    });

    socket.on("close", () => {
      console.log("Client disconnected from WebSocket server");
    });

    socket.on("error", (error) => {
      console.error("WebSocket client error:", error);
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
  if (!wss) {
    console.error("WebSocket server is not initialized");
    return;
  }

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

import cors from "cors";
import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";

// Useful for debugging
// collaboration conflicts on one computer.
const BROADCAST_DELAY_TIME = 0;
const SOCKET_FRONTEND_URL = "http://localhost:3000";

const app: Express = express();

app.use(cors());

const server = http.createServer(app);
const port = 4000;

const io = new Server(server, {
  cors: {
    origin: SOCKET_FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on("send_message", (data) => {
    setTimeout(() => {
      socket.broadcast.emit("receive_message", data);
    }, BROADCAST_DELAY_TIME);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

server.listen(port, async () => {
  console.log(`Local: http://localhost:${port}`);

  const networkAddress = await getNetworkAddress();

  if (networkAddress) {
    console.log(`Network: http://${networkAddress}:${port}`);
  } else {
    console.log("Network: Not available");
  }
});

async function getNetworkAddress() {
  const os = await import("os");
  const nets = os.networkInterfaces();
  const results: Record<string, string[]> = {};

  for (const name of Object.keys(nets)) {
    for (const net of nets?.[name] ?? []) {
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  return results["en0"]?.[0];
}

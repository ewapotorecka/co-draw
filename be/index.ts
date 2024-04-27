import express, { Express, Request, Response } from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app: Express = express();

app.use(cors());

const server = http.createServer(app);
const port = 4000;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server listening on *:${port}`);
});

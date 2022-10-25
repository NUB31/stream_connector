import { Server } from "socket.io";
import { SocketClient } from "../types/SocketClient";
import express from "express";
import { getSettings } from "./config";
import http from "http";

const app = express();
const server = http.createServer(app);
const port = getSettings().serverPort;
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export let clients: SocketClient[] = [];

export default function startServer(cb: () => void) {
  server.listen(port, () => {
    console.log(`Connector listening on ${port}`);
    cb();
  });
}

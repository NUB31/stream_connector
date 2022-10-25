import startServer, { clients, io } from "./helpers/socket";

import getSocketByRole from "./helpers/getSocketByRole";

startServer(() => {
  main();
});

function main() {
  io.on("connection", (socket) => {
    console.log(`User connected with id: ${socket.id}`);

    // Start music
    socket.on("music/play", async (content, cb) => {
      const musicSocket = await getSocketByRole("music");
      if (musicSocket) {
        musicSocket.emit("play", content, (res: any) => {
          if (cb && res) cb(res);
        });
      } else {
        if (cb) cb({ status: false, message: "Music service not connected" });
      }
    });

    socket.on("music/add", async (content, cb) => {
      const musicSocket = await getSocketByRole("music");
      if (musicSocket) {
        musicSocket.emit("add", content, (res: any) => {
          if (cb && res) cb(res);
        });
      } else {
        if (cb) cb({ status: false, message: "Music service not connected" });
      }
    });

    socket.on("music/pause", async (content, cb) => {
      const musicSocket = await getSocketByRole("music");
      if (musicSocket) {
        musicSocket.emit("pause", content, (res: any) => {
          if (cb && res) cb(res);
        });
      } else {
        if (cb) cb({ status: false, message: "Music service not connected" });
      }
    });

    socket.on("music/resume", async (content, cb) => {
      const musicSocket = await getSocketByRole("music");
      if (musicSocket) {
        musicSocket.emit("resume", content, (res: any) => {
          if (cb && res) cb(res);
        });
      } else {
        if (cb) cb({ status: false, message: "Music service not connected" });
      }
    });

    socket.on("music/skip", async (content, cb) => {
      const musicSocket = await getSocketByRole("music");
      if (musicSocket) {
        musicSocket.emit("skip", content, (res: any) => {
          if (cb && res) cb(res);
        });
      } else {
        if (cb) cb({ status: false, message: "Music service not connected" });
      }
    });
    // End music

    // Start chat
    socket.on("chat/message", async (content, cb) => {
      const chatSocket = await getSocketByRole("chat");
      if (chatSocket) {
        chatSocket.emit("message", content, (res: any) => {
          if (cb && res) cb(res);
        });
      } else {
        if (cb) cb({ status: false, message: "Chat service not connected" });
      }
    });
    // End chat

    socket.on("storeClientInfo", function (data) {
      clients.push({ role: data.role, socketId: socket.id });
      console.log(`Assigned role: ${data.role} to id: ${socket.id}`);
    });

    socket.on("disconnect", function (data) {
      for (var i = 0, len = clients.length; i < len; ++i) {
        var c = clients[i];

        if (c.socketId == socket.id) {
          clients.splice(i, 1);
          break;
        }
      }
    });
  });
}

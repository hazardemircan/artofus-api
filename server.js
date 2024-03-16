// src/server.js

const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

require("./src/Sockets")(io); // Setup Socket.IO

const PORT = process.env.PORT; //|| 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

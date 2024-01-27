const BitModel = require("../Api/Models/BitModel");

module.exports = (io) => {
  let bitArray = [];

  for (let index = 0; index < 144; index++) {
    bitArray.push(new BitModel(index, "white"));
  }

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Send the current bitArray to the newly connected client
    socket.emit("initialBits", bitArray);

    // Listen for a "changeBit" event from clients
    socket.on("changeBit", (changedBit) => {
      // Update the bitArray with the new color for the specified bit
      let bit = bitArray.find((b) => b.id === changedBit.id);
      if (bit) {
        bit.color = changedBit.color;
      }

      // Broadcast the updated bitArray to all clients
      io.emit("updateBits", bitArray);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

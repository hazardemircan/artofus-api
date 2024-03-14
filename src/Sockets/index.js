const BitModel = require("../Api/Models/BitModel");
const bitMapService = require("../Api/Services/bitMapService");

module.exports = (io) => {
  let _bitMapService = new bitMapService();

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Send the current bitArray to the newly connected client
    (async () => {
      try {
        const map = await _bitMapService.getInitialData();
        socket.emit("initialBits", map);
      } catch (error) {
        // Handle errors appropriately (e.g., log or send an error response)
        console.error("Error while getting map:", error);
      }
    })();

    // Listen for a "changeBit" event from clients
    socket.on("changeBit", (changedBit) => {
      (async () => {
      // Update the bitArray with the new color for the specified bit
     await _bitMapService.changeBitColor(changedBit.id, changedBit.color);

      // Broadcast the updated bitArray to all clients

    
        try {
          const map = await _bitMapService.getBits();
          io.emit("updateBits", map);
        } catch (error) {
          console.error("Error while getting map:", error);
        }
      })();
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

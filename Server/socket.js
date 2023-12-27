

import RoomController from "./Controller/RoomController.js";
const sockets = (socket) => {
    const roomController = new RoomController(socket);

  socket.on("join-room", roomController.joinRoom);
  socket.on("new-room-created", roomController.newRoomCreated);
  socket.on("room-removed", roomController.roomRemoved);



  socket.on("disconnect", (socket) => {
    console.log("User left.");
  });
};

export default sockets;

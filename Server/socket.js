
import MessageController from "./Controller/MessageController.js";
import RoomController from "./Controller/RoomController.js";
const sockets = (socket) => {
    const roomController = new RoomController(socket);
    const messageController = new MessageController(socket);

  socket.on("join-room", roomController.joinRoom);
  socket.on("new-room-created", roomController.newRoomCreated);
  socket.on("send-message", messageController.sendMessage);



  socket.on("disconnect", (socket) => {
    console.log("User left.");
  });
};

export default sockets;

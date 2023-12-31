import Room from "../modal/Room.js";
import BaseController from "./BaseController.js";
export default class RoomController extends BaseController {
  joinRoom = ({ roomId }) => {
    console.log(roomId,"roomId");
    this.socket.join(roomId);
  };

  newRoomCreated = ({ roomId, userId }) => {
    const room = new Room({
      name: "Test",
      roomId,
      userId,
    });
    room.save();
    this.socket.emit("new-room-created", { room });
  };

  roomRemoved = async ({ roomId }) => {
    await Room.deleteOne({ roomId });
    this.socket.emit("room-removed", { roomId });
  };
}

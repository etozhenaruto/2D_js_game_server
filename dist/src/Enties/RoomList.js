"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Room_1 = __importDefault(require("./Room"));
class RoomList {
    constructor() {
        this.rooms = [];
    }
    createNewRoom(roomID) {
        const newRoom = new Room_1.default(roomID);
        this.rooms.push(newRoom);
    }
    getRoomByID(roomID) {
        return this.rooms.find(({ id }) => id === roomID);
    }
    deleteRoomByID(roomID) {
        this.rooms = this.rooms.filter(({ id }) => id !== roomID);
    }
    getRoomByUserID(userID) {
        return this.rooms.find((room) => {
            return room.users.find((id) => id === userID);
        });
    }
}
exports.default = RoomList;
//# sourceMappingURL=RoomList.js.map
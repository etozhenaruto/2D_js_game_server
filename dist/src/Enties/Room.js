"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(id) {
        this.users = [];
        this.characterList = [];
        this.id = id;
    }
    addNewUser(userID) {
        this.users.push(userID);
    }
    deleteUserByID(userID) {
        this.users = this.users.filter((id) => id !== userID);
    }
    getUsersInRoom() {
        return this.users;
    }
}
exports.default = Room;
//# sourceMappingURL=Room.js.map
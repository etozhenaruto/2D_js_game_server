const ACTIONS = require("../../actions")
const Room = require("./Room")

class RoomList {
    socket
    io

    rooms = []
    constructor(io) {
        this.io = io
    }

    createNewRoom(roomID, userID) {
        const newRoom = new Room(roomID)

        newRoom.addNewUser(userID)
        this.rooms.push(newRoom)
        this.updateRoomList()
    }

    deleteRoomByID(roomID) {
        this.rooms = this.users.filter((id) => id !== roomID)
    }

    updateRoomList() {
        this.io.emit(ACTIONS.SHARE_ROOMS, this.rooms)
    }



    //SOCKET LOGIC


}

module.exports = RoomList
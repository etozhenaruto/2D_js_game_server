const ACTIONS = require("../../actions")
const Room = require("./Room")

class RoomList {
    io

    rooms = []
    constructor(io) {
        this.io = io
    }

    createNewRoom(roomID) {
        const newRoom = new Room(roomID)

        this.rooms.push(newRoom)
        this.updateRoomList()
    }

    getRoomByID(roomID) {
        return this.rooms.find(({ id }) => id === roomID)
    }

    deleteRoomByID(roomID) {
        this.rooms = this.users.filter((id) => id !== roomID)
    }

    updateRoomList() {
        this.io.emit(ACTIONS.SHARE_ROOMS, { rooms: this.rooms })
    }

    updateroomByID(roomID) {
        const currentRoom = this.getRoomByID(roomID)
        currentRoom.users.forEach(userID => {
            this.io.to(userID).emit(ACTIONS.UPDATE_ROOM, currentRoom);
        })
    }

    getRoomByUserID(userID) {
        return this.rooms.find((room) => {
            return room.users.find((id) => id === userID)
        })
    }



    //SOCKET LOGIC


}

module.exports = RoomList
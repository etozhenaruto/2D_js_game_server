const ACTIONS = require("../../actions")
const Room = require("./Room")

class RoomList {
    rooms = []

    createNewRoom(roomID) {
        const newRoom = new Room(roomID)
        this.rooms.push(newRoom)
    }

    getRoomByID(roomID) {
        return this.rooms.find(({ id }) => id === roomID)
    }

    deleteRoomByID(roomID) {
        this.rooms = this.rooms.filter(({ id }) => id !== roomID)
    }

    getRoomByUserID(userID) {
        return this.rooms.find((room) => {
            return room.users.find((id) => id === userID)
        })
    }

}

module.exports = RoomList
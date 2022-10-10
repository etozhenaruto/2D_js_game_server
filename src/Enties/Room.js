class Room {
    socket
    io

    id
    users = []
    constructor(id, socket, io) {
        this.id = id
        this.socket = socket
        this.io = io
    }

    addNewUser(userID) {
        this.users.push(userID)
    }

    deleteUserByID(userID) {
        this.users = this.users.filter((id) => id !== userID)
    }

    getUsersInRoom() {
        return this.users
    }
}

module.exports = Room

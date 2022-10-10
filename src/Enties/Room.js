class Room {
    id
    users = []
    constructor(id) {
        this.id = id
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

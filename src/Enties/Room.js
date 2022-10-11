
const characters = require('./CharactersList');
class Room {
    id
    users = []
    chars = []
    constructor(id) {
        this.id = id
        chars = [new characters("bogdan",10,10), new characters("bogdan",10,10), new characters("bogdan",10,10), new characters("bogdan",10,10)]
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

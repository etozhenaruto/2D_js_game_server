class Room {
    id
    users = []
    characterList = [{ name: 'vaday', HP: 100, damage: 10 }, { name: 'bogdan', HP: 100, damage: 10 }, { name: 'ILJAAA', HP: 100, damage: 10 }]
    selectedCharaterNameList = []
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

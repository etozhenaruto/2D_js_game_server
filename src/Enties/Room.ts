export default class Room {
    id: string;
    users: Array<string> = []
    characterList: Array<string> = []
    constructor(id: string) {
        this.id = id
    }

    addNewUser(userID: string) {
        this.users.push(userID)
    }

    deleteUserByID(userID: string) {
        this.users = this.users.filter((id) => id !== userID)
    }

    getUsersInRoom(): Array<string> {
        return this.users
    }
}

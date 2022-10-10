
import Room from "./Room"

export default class RoomList {
    rooms: Array<Room> = []

    createNewRoom(roomID: string) {
        const newRoom = new Room(roomID)
        this.rooms.push(newRoom)
    }

    getRoomByID(roomID: string): Room {
        return this.rooms.find(({ id }) => id === roomID)
    }

    deleteRoomByID(roomID: string) {
        this.rooms = this.rooms.filter(({ id }) => id !== roomID)
    }

    getRoomByUserID(userID: string): Room {
        return this.rooms.find((room) => {
            return room.users.find((id) => id === userID)
        })
    }

}
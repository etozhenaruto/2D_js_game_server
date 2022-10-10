const ACTIONS = require("../../actions")
const ERRORS = require("../errors")

class RoomListWS {
    io
    room_list_insance
    constructor(io, room_list_insance) {
        this.io = io
        this.room_list_insance = room_list_insance
    }

    emitUpdateRooms() {
        this.io.emit(ACTIONS.SHARE_ROOMS, { rooms: this.room_list_insance.rooms })
    }

    emitUpdateRoomByID(roomID) {
        const currentRoom = this.room_list_insance.getRoomByID(roomID)
        currentRoom.users.forEach(userID => {
            this.io.to(userID).emit(ACTIONS.UPDATE_ROOM, currentRoom);
        })
    }

    emitRoomError() {
        this.io.emit(ERRORS.ROOM_NOT_FIND)
    }

    watch(socket) {
        this.emitUpdateRooms()

        socket.on(ACTIONS.CREATE_ROOM, ({ roomID }) => {
            this.room_list_insance.createNewRoom(roomID)
            socket.join(roomID)
            this.emitUpdateRooms()
        })

        socket.on(ACTIONS.JOIN_ROOM, ({ roomID }) => {
            const currentRoom = this.room_list_insance.getRoomByID(roomID)

            if (currentRoom) {
                currentRoom.addNewUser(socket.id)
                socket.join(roomID);
                this.emitUpdateRoomByID(roomID)
            } else {
                this.emitRoomError()
            }
        })

        socket.on(ACTIONS.LEAVE, ({ roomID }) => {
            const currentRoom = this.room_list_insance.getRoomByID(roomID)
            if (currentRoom) {
                currentRoom.deleteUserByID(socket.id)
                socket.leave(roomID);
                this.emitUpdateRoomByID(roomID)

                if (!Boolean(currentRoom.users.length)) {
                    this.room_list_insance.deleteRoomByID(roomID)
                }
            }
            this.emitUpdateRooms()
        });

        socket.on('disconnecting', () => {
            const room = this.room_list_insance.getRoomByUserID(socket.id)
            if (room) {
                room.deleteUserByID(socket.id)
                socket.leave(room.id);
                this.emitUpdateRoomByID(room.id)

                if (!Boolean(room.users.length)) {
                    this.room_list_insance.deleteRoomByID(room.id)
                }
            }

            this.emitUpdateRooms()
        });
    }
}

module.exports = RoomListWS

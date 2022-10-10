class RoomWS {
    io
    room_list_insance
    constructor(io, room_list_insance) {
        this.io = io
        this.room_list_insance = room_list_insance
    }

    emitUpateRooms() {
        this.io.emit(ACTIONS.SHARE_ROOMS, { rooms: this.rooms })
    }

    //
    watch() {

    }
}
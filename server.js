const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const ACTIONS = require('./actions');
const RoomList = require('./src/Enties/RoomList');
const PORT = process.env.PORT || 3001;

//СОЗДАНИЕ ИНСТАНСОВ
const room_list = new RoomList(io)
//------------------

io.on('connection', socket => {

    room_list.updateRoomList()

    //СОЗДАНИЕ КОМНАТЫ
    socket.on(ACTIONS.CREATE_ROOM, ({ roomID }) => {
        room_list.createNewRoom(roomID)
        socket.join(roomID)
    })
    //---------------

    //ДОБАВЛЕНИЕ ПОЗЛЬЗОВАТЕЛЯ В КОМНАТУ
    socket.on(ACTIONS.JOIN_ROOM, ({ roomID }) => {
        const currentRoom = room_list.getRoomByID(roomID)
        currentRoom.addNewUser(socket.id)
        socket.join(roomID);
        room_list.updateroomByID(roomID)
    })
    //---------------------------------

    socket.on(ACTIONS.LEAVE, ({ roomID }) => {
        const currentRoom = room_list.getRoomByID(roomID)
        currentRoom.deleteUserByID(socket.id)
        socket.leave(roomID);
        room_list.updateroomByID(roomID)
        room_list.updateRoomList()
    });
    socket.on('disconnecting', (data) => {
        const room = room_list.getRoomByUserID(socket.id)
        if (room) {
            room.deleteUserByID(socket.id)
            socket.leave(room.id);
            room_list.updateroomByID(room.id)
            room_list.updateRoomList()
        }
    });

    // socket.on(ACTIONS.RELAY_SDP, ({ peerID, sessionDescription }) => {
    //     io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
    //         peerID: socket.id,
    //         sessionDescription,
    //     });
    // });

    // socket.on(ACTIONS.RELAY_ICE, ({ peerID, iceCandidate }) => {
    //     io.to(peerID).emit(ACTIONS.ICE_CANDIDATE, {
    //         peerID: socket.id,
    //         iceCandidate,
    //     });
    // });

});

const publicPath = path.join(__dirname, 'build');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(PORT, () => {
    console.log('Server Started!')
})

module.exports = io
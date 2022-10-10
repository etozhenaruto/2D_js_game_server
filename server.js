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
    socket.on(ACTIONS.CREATE_ROOM, ({ roomID, userID }) => {
        room_list.createNewRoom(roomID, userID)
        socket.join(roomID)
    })
    //---------------

    // //ДОБАВЛЕНИЕ ПОЗЛЬЗОВАТЕЛЯ В КОМНАТУ
    // socket.on(ACTIONS.JOIN_ROOM, ({ roomID }) => {
    //     const RoomClients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

    //     //добавляем пользователя в команту и обновляем список всех комнат
    //     socket.join(roomID);

    //     updateRoomByID(roomID)
    // })
    // //---------------------------------

    // //ВЫХОД ПОЛЬЗОВАТЕЛЯ
    // function leaveRoom({ roomID, userID }) {
    //     socket.leave(roomID);
    //     updateRoomByID(roomID)
    // }
    // //--------------------------------

    // // function leaveRoom({roomID, userID}) {
    // //     const { rooms } = socket;

    // //     Array.from(rooms)
    // //         // LEAVE ONLY CLIENT CREATED ROOM
    // //         .filter(roomID => validate(roomID) && version(roomID) === 4)
    // //         .forEach(roomID => {

    // //             const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

    // //             clients
    // //                 .forEach(clientID => {
    // //                     io.to(clientID).emit(ACTIONS.REMOVE_PEER, {
    // //                         peerID: socket.id,
    // //                     });

    // //                     socket.emit(ACTIONS.REMOVE_PEER, {
    // //                         peerID: clientID,
    // //                     });
    // //                 });

    // //             socket.leave(roomID);
    // //         });

    // //     shareRoomsInfo();
    // // }

    // socket.on(ACTIONS.LEAVE, leaveRoom);
    // socket.on('disconnecting', leaveRoom);

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
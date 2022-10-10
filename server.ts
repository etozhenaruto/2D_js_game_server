import express from 'express';
import http from 'http';
import { Server } from 'socket.io'

import RoomList from './src/Enties/RoomList';
import RoomListWS from './src/webscket/RoomWS';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3001;

//СОЗДАНИЕ СИНГОЛТОНОВ
const room_list = new RoomList()
const room_list_WS = new RoomListWS(io, room_list)
//------------------


io.on('connection', socket => {
    room_list_WS.watch(socket)
});

server.listen(PORT, () => {
    console.log('Server Started!')
})
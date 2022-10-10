const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const RoomList = require('./src/Enties/RoomList');
const RoomListWS = require('./src/webscket/RoomWS');
const PORT = process.env.PORT || 3001;
//СОЗДАНИЕ СИНГОЛТОНОВ
const room_list = new RoomList();
const room_list_WS = new RoomListWS(io, room_list);
//------------------
io.on('connection', socket => {
    room_list_WS.watch(socket);
});
const publicPath = path.join(__dirname, 'build');
app.use(express.static(publicPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
server.listen(PORT, () => {
    console.log('Server Started!');
});
module.exports = io;
//# sourceMappingURL=server.js.map
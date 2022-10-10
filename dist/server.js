"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const RoomList_1 = __importDefault(require("./src/Enties/RoomList"));
const RoomWS_1 = __importDefault(require("./src/webscket/RoomWS"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const PORT = process.env.PORT || 3001;
//СОЗДАНИЕ СИНГОЛТОНОВ
const room_list = new RoomList_1.default();
const room_list_WS = new RoomWS_1.default(io, room_list);
//------------------
io.on('connection', socket => {
    room_list_WS.watch(socket);
});
server.listen(PORT, () => {
    console.log('Server Started!');
});
//# sourceMappingURL=server.js.map
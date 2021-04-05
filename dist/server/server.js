"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const port = 3000;
class App {
    constructor(port) {
        this.port = port;
        const app = express_1.default();
        app.use(express_1.default.static(path_1.default.join(__dirname, '../client')));
        app.use('/build/three.module.js', express_1.default.static(path_1.default.join(__dirname, '../../node_modules/three/build/three.module.js')));
        this.server = new http_1.default.Server(app);
        const io = new socket_io_1.default.Server(this.server);
        io.on('connection', (socket) => {
            console.log(`utente ${socket.id} connesso al socket server`);
            socket.emit('message', `Buongiorno Utente ${socket.id}`);
            socket.on('disconnect', () => {
                console.log(`l'utente ${socket.id} si è disconnesso`);
            });
        });
    }
    Start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}.`);
        });
    }
}
new App(port).Start();
//# sourceMappingURL=server.js.map
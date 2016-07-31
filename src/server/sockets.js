"use strict";
/// <reference path="../../typings/index.d.ts" />
const io = require('socket.io');
const auth_1 = require('./modules/auth');
let instance = null;
class Sockets {
    /**
     * Constructor
     * @param http
     */
    constructor(http) {
        // create IO
        this.io = io(http);
        // IO on connection
        // nothing can be bind to io before first connection
        this.io.on('connection', this.onNewConnection.bind(this));
    }
    // private socket;
    /**
     * Static get instance
     * - singleton pattern
     * @param http
     * @returns {null}
     */
    static instance(http) {
        if (!instance) {
            instance = new Sockets(http);
        }
        return instance;
    }
    onNewConnection(socket) {
        console.warn('new connection!');
        // this.socket = socket;
        // init all modules
        // TODO: move it ?
        // each module has to be initialized for every new user
        // as every user have different socket
        new auth_1.default(socket);
    }
}
exports.Sockets = Sockets;
//# sourceMappingURL=sockets.js.map
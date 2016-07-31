/// <reference path="../../typings/index.d.ts" />
import * as io from 'socket.io';
import * as Q from 'q';
import ClientAuth from './modules/auth';

let instance = null;

export class Sockets {

    private io;
    // private socket;

    /**
     * Static get instance
     * - singleton pattern
     * @param http
     * @returns {null}
     */
    static instance(http?) {
        if (!instance) {
            instance = new Sockets(http);
        }
        return instance;
    }

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

    onNewConnection(socket) {
        console.warn('new connection!');
        // this.socket = socket;

        // init all modules
        // TODO: move it ?
        // each module has to be initialized for every new user
        // as every user have different socket
        new ClientAuth(socket);
    }

}

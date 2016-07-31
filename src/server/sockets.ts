/// <reference path="../../typings/index.d.ts" />
import * as io from 'socket.io';
let instance = null;

export class Sockets {

    private io;

    static instance(http?) {
        if (!instance) {
            return new Sockets(http);
        }
        return instance;
    }

    constructor(http) {
        this.io = io(http);
        this.config();
    }

    config() {
        console.log('Sockets:config');
        this.io.on('connection', function(socket){
            console.log('a user connected');
        });
    }

    event(event, cb) {
        this.io.on(event, function(data){
            cb(data);
        });
    }

}

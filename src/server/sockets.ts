/// <reference path="../../typings/index.d.ts" />
import * as io from 'socket.io';

export class Sockets {

    private io;

    static bootstrap(http) {
        return new Sockets(http);
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

}

/// <reference path="../../../typings/index.d.ts" />

export default class ClientAuth {

    private sockets;

    constructor(sockets) {
        this.sockets = sockets;
        this.sockets.on('auth:login', this.onAuthLogin.bind(this));
    }

    onAuthLogin(data) {
        console.warn('login attempt on server!');
        console.info(data);
        this.emitAuthLogin();
    }

    emitAuthLogin() {
        console.log('emit true');
        this.sockets.emit('auth:login:response', true);
    }
}
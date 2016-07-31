/// <reference path="../../../typings/index.d.ts" />
"use strict";
class ClientAuth {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClientAuth;
//# sourceMappingURL=auth.js.map
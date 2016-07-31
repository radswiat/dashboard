/// <reference path="../../../typings/index.d.ts" />
import db from '../db';

export default class ClientAuth {

    private sockets;

    constructor(sockets) {
        this.db = db.instance();
        this.sockets = sockets;
        this.sockets.on('auth:login', this.onAuthLogin.bind(this));
    }

    onAuthLogin(credentials) {
        console.warn('login attempt on server!');
        console.log(credentials);
        this.db.query((db, promise) => {

            db.collection('users').find({
                username: credentials.username
            }).toArray((err, data) => {
                if (data && data.length) {
                    promise.resolve();
                    this.emitAuthLogin(true);
                    return;
                }else {
                    promise.resolve();
                    this.emitAuthLogin(false);
                    return;
                }
            });

        });
    }

    emitAuthLogin(value) {
        console.log('auth result: ' + value);
        this.sockets.emit('auth:login:response', value);
    }
}
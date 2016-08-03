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
        this.sockets.emit('auth:login:response', {
            status : true,
            password: {
                length: 12,
                fields : [
                    {
                        id : 1,
                        enabled : false
                    },
                    {
                        id : 2,
                        enabled : true
                    },
                    {
                        id : 3,
                        enabled : true
                    },
                    {
                        id : 4,
                        enabled : false
                    },
                    {
                        id : 5,
                        enabled : true
                    },
                    {
                        id : 6,
                        enabled : false
                    },
                    {
                        id : 7,
                        enabled : false
                    },
                    {
                        id : 8,
                        enabled : true
                    },
                    {
                        id : 9,
                        enabled : false
                    },
                    {
                        id : 10,
                        enabled : false
                    },
                    {
                        id : 11,
                        enabled : true
                    },
                    {
                        id : 12,
                        enabled : false
                    }
                ]
            }
        });
    }
}
/// <reference path="../../../typings/index.d.ts" />
import {Sockets} from '../sockets';

export default class ClientAuth {

    private sockets;

    constructor() {
        this.sockets = Sockets.instance();
        this.events();
    }

    events() {
        this.sockets.event('login', () => {
            console.warn('login attempt on server!');
        });
    }
}
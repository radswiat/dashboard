/// <reference path="../../typings/index.d.ts" />
"use strict";
const express = require('express');
const http = require('http');
const db = require('./db');
const sockets_1 = require('./sockets');
// import ClientAuth from './modules/auth';
//import * as chalk from 'chalk';
/**
 * The server.
 *
 * @class Server
 */
class Server {
    /**
     * Constructor.
     *
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();
        this.http = http.Server(this.app);
        //configure application
        this.config();
        this.port();
        this.components();
        this.modules();
    }
    /**
     * Bootstrap the application.
     *
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    static bootstrap() {
        return new Server();
    }
    /**
     * Set up server config
     * @method config
     */
    config() {
        this.app.get('/', function (req, res) {
            res.sendFile(__dirname + '/public/index.html');
        });
        this.app.use(express.static('public'));
    }
    /**
     * Set server port to use
     * @method port
     */
    port() {
        this.http.listen(3000, function () {
            console.log('listening on *:3000');
        });
    }
    components() {
        db.Mongo.instance();
        sockets_1.Sockets.instance(this.http);
    }
    modules() {
        // new ClientAuth();
    }
}
let server = Server.bootstrap();
module.exports = server.app;
//# sourceMappingURL=server.js.map
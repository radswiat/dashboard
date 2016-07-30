/// <reference path="../../typings/index.d.ts" />
'use strict';

import * as express from 'express';
import * as http    from 'http';
import * as path    from 'path';
import * as io      from 'socket.io';
import db from './db';

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @constructor
     */
    constructor() {

        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        this.port();

        // start db
        db.bootstrap();
    }

    /**
     * Set up server config
     * @method config
     */
    config() {

        this.app.get('/', function(req, res){
            res.sendFile(__dirname + '/public/index.html');
        });

        this.app.use(express.static('public'));

    }


    /**
     * Set server port to use
     * @method port
     */
    port() {
        (<any>http).Server(this.app).listen(3000, function(){
            console.log('listening on *:3000');
        });
    }
}


let server = Server.bootstrap();
export = server.app;
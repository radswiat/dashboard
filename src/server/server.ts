/// <reference path="../../typings/index.d.ts" />

import * as express from 'express';
import * as http    from 'http';
import * as io      from 'socket.io';
import * as db      from './db';
import {Sockets} from './sockets';

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: express.Application;
    private http;

    /**
     * Bootstrap the application.
     *
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap():Server {
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

        this.http = (<any>http).Server(this.app);

        //configure application
        this.config();

        this.port();

        // start db
        db.Mongo.bootstrap();

        // start sockets
        Sockets.bootstrap(this.http);
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
}


let server = Server.bootstrap();
export = server.app;
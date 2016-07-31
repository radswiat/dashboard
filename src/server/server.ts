/// <reference path="../../typings/index.d.ts" />

import * as express from 'express';
import * as http    from 'http';
import * as db      from './db';
import {Sockets} from './sockets';
// import ClientAuth from './modules/auth';
//import * as chalk from 'chalk';


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

        this.http = (<any>http).Server(this.app);

        //configure application
        this.config();

        this.port();

        this.components();

        this.modules();

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
        Sockets.instance(this.http);
    }

    modules() {
        // new ClientAuth();
    }
}


let server = Server.bootstrap();
export = server.app;
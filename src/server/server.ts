/// <reference path="../../typings/index.d.ts" />

import * as express         from 'express';
import * as exphbs          from 'express-handlebars';
import * as cookieParser    from 'cookie-parser';
import * as http            from 'http';
import db                   from './db';
import {Sockets}            from './sockets';
import * as csrf            from 'csurf';
import * as path            from 'path';
// import ClientAuth from './modules/auth';
//import * as chalk from 'chalk';


// Server base dir
const BASE_DIR = path.join(__dirname);

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: express.Application;
    private http;
    private csrfProtection;

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

        this.CSRF();

        // define view engine
        this.renderEngine();

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

        this.app.use(cookieParser());

        this.app.get('/', this.csrfProtection,  (req, res) => {
            console.log('csrfProtection');
            console.log(this.csrfProtection);
            // res.sendFile(BASE_DIR + '/public/index.html');
            res.render('index', {
                csrf : req.csrfToken()
            });
        });

        this.app.use(express.static(BASE_DIR + '/public'));
    }

    renderEngine() {
        this.app.engine('.html', exphbs({
            defaultLayout   : 'index',
            extname         : '.html',
            layoutsDir      : path.join(BASE_DIR, '/public/'),
            partialsDir     : path.join(BASE_DIR, '/public/')
        }));
        this.app.set('view engine', '.html');
        this.app.set('views', path.join(BASE_DIR, '/public/'));
    }

    /**
     * Set CSRF
     */
    CSRF() {
        this.csrfProtection = csrf({ cookie: true });
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
        db.instance();
        Sockets.instance(this.http);
    }

    modules() {
        // new ClientAuth();
    }
}


let server = Server.bootstrap();
export = server.app;
/// <reference path="../../typings/index.d.ts" />
'use strict';
var express = require('express');
var http = require('http');
var db = require('./db');
/**
 * The server.
 *
 * @class Server
 */
var Server = (function () {
    /**
     * Constructor.
     *
     * @constructor
     */
    function Server() {
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        this.port();
        // start db
        db.bootstrap();
    }
    /**
     * Bootstrap the application.
     *
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Set up server config
     * @method config
     */
    Server.prototype.config = function () {
        this.app.get('/', function (req, res) {
            res.sendFile(__dirname + '/public/index.html');
        });
        this.app.use(express.static('public'));
    };
    /**
     * Set server port to use
     * @method port
     */
    Server.prototype.port = function () {
        http.Server(this.app).listen(3000, function () {
            console.log('listening on *:3000');
        });
    };
    return Server;
}());
var server = Server.bootstrap();
module.exports = server.app;

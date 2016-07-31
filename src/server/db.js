/// <reference path="../../typings/index.d.ts" />
'use strict';
var mongodb = require('mongodb');
var DB;
(function (DB) {
    var Mongo = (function () {
        function Mongo() {
            var url = 'mongodb://localhost:27017/my_database_name';
            this.db = mongodb.MongoClient;
            this.db.connect(url, function (err, db) {
                if (err) {
                    console.log('Unable to connect to the mongoDB server. Error:', err);
                }
                else {
                    //HURRAY!! We are connected. :)
                    console.log('Connection established to', url);
                    // do some work here with the database.
                    //Close connection
                    db.close();
                }
            });
        }
        Mongo.bootstrap = function () {
            return new Mongo();
        };
        return Mongo;
    }());
    DB.Mongo = Mongo;
})(DB || (DB = {}));
exports.__esModule = true;
exports["default"] = DB;
//export default MongoDB;
//
//// https://github.com/mysqljs/mysql#install
//import * as mysql from 'mysql';
//
//class MySql {
//
//    private db;
//
//    static bootstrap() {
//        return new MySql();
//    }
//
//    constructor() {
//        this.db = mysql.createConnection({
//            host     : 'localhost',
//            user     : 'me',
//            password : 'secret',
//            database : 'my_db'
//        });
//        this.db.connect();
//    }
//
//}
//
//
//export default MySql; 

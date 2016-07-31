"use strict";
/// <reference path="../../typings/index.d.ts" />
const mongodb = require('mongodb');
let instance = null;
var DB;
(function (DB) {
    class Mongo {
        constructor() {
            let url = 'mongodb://localhost:27017/my_database_name';
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
        static instance() {
            if (!instance) {
                return new Mongo();
            }
            return instance;
        }
    }
    DB.Mongo = Mongo;
})(DB || (DB = {}));
module.exports = DB;
//# sourceMappingURL=db.js.map
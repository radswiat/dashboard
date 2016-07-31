/// <reference path="../../typings/index.d.ts" />
import mongodb = require('mongodb');

let instance = null;

module DB {

    export class Mongo {

        private db;

        static instance() {
            if (!instance) {
                return new Mongo();
            }
            return instance;
        }

        constructor() {
            let url = 'mongodb://localhost:27017/my_database_name';
            this.db = mongodb.MongoClient;
            this.db.connect(url, function (err, db) {
                if (err) {
                    console.log('Unable to connect to the mongoDB server. Error:', err);
                } else {
                    //HURRAY!! We are connected. :)
                    console.log('Connection established to', url);

                    // do some work here with the database.

                    //Close connection
                    db.close();
                }
            });
        }
    }

}

export = DB;
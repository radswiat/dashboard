/// <reference path="../../typings/index.d.ts" />
import mongodb = require('mongodb');
import * as Q from 'Q';

let instance = null;


export default class DB {

    private db;

    static instance() {
        if (!instance) {
            return new DB();
        }
        return instance;
    }

    constructor() {
        this.url = 'mongodb://localhost:27017/rtd';
        this.db = mongodb.MongoClient;
        this.db.connect(this.url, (err, db) => {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                //HURRAY!! We are connected. :)
                console.log('Connection established to', this.url);

                //Close connection
                db.close();
            }
        });
    }



    query(cb) {
        this.db.connect(this.url, (err, db) => {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {

                let defer = Q.defer();

                cb(db, defer);
                //
                // defer.promise.then(() => {
                //     // db.close();
                // });

                db.close();

            }
        });

    }
}

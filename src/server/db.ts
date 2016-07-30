// https://github.com/mysqljs/mysql#install
import * as mysql from 'mysql';

class MySql {

    private db;

    static bootstrap() {
        return new MySql();
    }

    constructor() {
        this.db = mysql.createConnection({
            host     : 'localhost',
            user     : 'me',
            password : 'secret',
            database : 'my_db'
        });
        this.db.connect();
    }

}


export default MySql;
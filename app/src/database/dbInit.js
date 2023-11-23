import { DatabaseConnection } from './dbConnection.js'

var db = null
export default class DatabaseInit {

    /**
     * Enabling foreign keys on SqLite
    */
    constructor() {
        db = DatabaseConnection.getConnection();
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
            console.log('Foreign keys turned on')
        );

        this.dbInit();
    }
    
    /**
     * Init database creating tables 
    */
    dbInit() {
        var sql = [
            `create table if not exists user (
                id integer primary key autoincrement,
                name text,
                email text unique,
                cpf text unique,
                password text
            );`,

            `create table if not exists waterRegistry (
                id integer primary key autoincrement,
                date text,
                quantity int,
                user_id int,
                foreign key (user_id) references user (id)
            );`,

            `create table if not exists workoutRegistry (
                id integer primary key autoincrement,
                date text,
                duration text,
                type text,
                user_id int,
                foreign key (user_id) references user (id)
            );`
        ];

        db.transaction(
            tx => {
                for (var i = 0; i < sql.length; i++) {
                    console.log("execute sql : " + sql[i]);
                    tx.executeSql(sql[i]);
                }
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("transaction complete call back ");
            }
        );
    }

}
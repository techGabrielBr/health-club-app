import { DatabaseConnection } from "../database/dbConnection";

const table = "user"
const db = DatabaseConnection.getConnection();

/**
 * User service class
 *
 * @export
 * @class UserService
 */
export default class UserService {
    
    /**
     * Create user function
     *
     * @static
     * @param {object} user
     * @return {number} 
     * @memberof UserService
     */
    static createUser(user) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (name, email, cpf, password) 
                    values (?,?,?,?)`, 
                    [user.name, user.email, user.cpf, user.password], 
                (_, { insertId, rows }) => {
                    console.log("id insert: " + insertId);
                    resolve(insertId);
                }), (sqlError) => {
                    reject(sqlError);
                }}, (txError) => {
                    reject(txError);
            }));
    }

    /**
     * Auth user function
     *
     * @static
     * @param {object} user
     * @return {object} 
     * @memberof UserService
     */
    static auth(user) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select id, name from ${table} where email=? AND password=?`, [user.email, user.password], (_, { rows }) => {
                resolve(rows);
            }), (sqlError) => {
                reject(sqlError);
            }}, (txError) => {
                reject(txError);
        }));
    }

    /**
     * Update Password function
     *
     * @static
     * @param {string} newPassword
     * @param {id} userId
     * @return {number} 
     * @memberof UserService
     */
    static updatePassword(newPassword, userId) {
        return new Promise((resolve, reject) =>db.transaction(tx => {
                tx.executeSql(`update ${table} set password = ? where id = ?;`, [newPassword, userId], (_, { rowsAffected }) => {
                    resolve(rowsAffected);
                }), (sqlError) => {
                    reject(sqlError);
                }}, (txError) => {
                    reject(txError)
            }));
    }
}
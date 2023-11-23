import { DatabaseConnection } from "../database/dbConnection";

const table = "waterRegistry"
const db = DatabaseConnection.getConnection();

/**
 * WaterRegistry service
 *
 * @export
 * @class WaterRegistryService
 */
export default class WaterRegistryService {
    
    /**
     * Create Water Registry function
     *
     * @static
     * @param {object} waterRegistry
     * @return {number} 
     * @memberof WaterRegistryService
     */
    static createWaterRegistry(waterRegistry) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (date, quantity, user_id) 
                    values (?,?,?)`, 
                    [waterRegistry.date, waterRegistry.quantity, waterRegistry.userId], 
                (_, { insertId, rows }) => {
                    console.log("id insert: " + insertId);
                    resolve(insertId);
                }), (sqlError) => {
                    console.log(sqlError)
                    reject(sqlError);
                }}, (txError) => {
                    console.log(txError)
                    reject(txError);
            }));
    }

    /**
     * Get All Registry function
     *
     * @static
     * @param {number} userId
     * @return {Array} 
     * @memberof WaterRegistryService
     */
    static findAll(userId) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select datetime(date), quantity from ${table} where user_id = ? order by datetime(date) DESC`, [userId], (_, { rows }) => {
                resolve(rows);
            }), (sqlError) => {
                reject(sqlError);
            }}, (txError) => {
                reject(txError);
        }));
    }
}
import { DatabaseConnection } from "../database/dbConnection";

const table = "workoutRegistry"
const db = DatabaseConnection.getConnection();

export default class WorkoutRegistryService {

    /**
     * Create Workout Registry function
     *
     * @static
     * @param {object} workoutRegistry
     * @return {number} 
     * @memberof WorkoutRegistryService
     */
    static createWorkoutRegistry(workoutRegistry) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (date, duration, type, user_id) 
                    values (?,?,?,?)`, 
                    [workoutRegistry.date, workoutRegistry.duration, workoutRegistry.type, workoutRegistry.userId], 
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
     * @memberof WorkoutRegistryService
     */
    static findAll(userId) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select datetime(date), duration, type from ${table} where user_id = ? order by datetime(date) DESC`, [userId], (_, { rows }) => {
                resolve(rows);
            }), (sqlError) => {
                reject(sqlError);
            }}, (txError) => {
                reject(txError);
        }));
    }
}
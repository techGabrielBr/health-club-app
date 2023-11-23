import * as SQLite from 'expo-sqlite';

/**
 * Open SqLite connection
*/
export const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase("database.db"),
};
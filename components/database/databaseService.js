// This class is a Helper Class for SQLite3. Acts as a service / data access layer.

import Database from 'better-sqlite3';

// Initialize DB.
const db = new Database('db/api.db');
db.pragma('journal_mode = WAL');

export const databaseService = {
    /**
     * Let's you execute a custom query.
     * @param {string} query 
     * @param {array} params 
     * @returns {any}
     */
    async execute(query = '', params = []){
        return db.prepare(query).get(params);
    },

    /**
     * Gets all records, support limiting.
     * @param {string} table 
     * @param {number} limit 
     * @returns {any}
     */
    async getAll(table, limit = 20){
        let query = `SELECT * FROM ${table}`;
        let parameters = [];
        
        // Define limit of response.
        if(limit) {
            query += ' LIMIT ?';
            parameters.push(limit)
        }

        return db.prepare(query).all(...parameters);
    },

    /**
     * Let's you get a record from a table based on a condition. 
     * The final data is parametrized as to make it SQL-Injection proof.
     * @param {string} table 
     * @param {string} attribute 
     * @param {*} data 
     * @returns {any}
     */
    async get(table, attribute = '', data = ''){
        return db.prepare(`SELECT * FROM ${table} WHERE ${attribute} = ?`).get(data);
    },

    /**
     * Inserts a record.
     * @param {string} table 
     * @param {array} attributes 
     * @param {array} data 
     * @returns {any}
     */
    async insert(table, attributes = [], data = []){
        // Building the proper prepared statement for SQLite3;
        let prepared = '';
        for (let item of data){
            prepared += (prepared == '') ? '?' : ',?';
        }
        
        return db.prepare(`INSERT INTO ${table} (${attributes}) VALUES (${prepared})` ).run(...data);
    },

    /**
     * Updates a record.
     * @param {string} table 
     * @param {array} attributes 
     * @param {array} data 
     * @returns {any}
     */
        async update(table, id, attributes = [], data = []){
            // Building the proper prepared statement for SQLite3;
            let columnsValues = '';
            for (let item of attributes){
                columnsValues += item + ' = ?,';
            }
            let finalcolumnsValues = columnsValues.slice(0, -1);            
            
            const query = `UPDATE ${table} SET ${finalcolumnsValues} WHERE id = ?`;
            return db.prepare(query).run(...data, id);
        },

    /**
     * Deletes a record from a table.
     * @param {string} table 
     * @param {id} id 
     * @returns 
     */
    async delete(table, id = ''){
        return db.prepare(`DELETE FROM ${table} WHERE id = ?` ).run(id);
    },
}

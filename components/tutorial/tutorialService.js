import {databaseService} from "../database/databaseService.js";

//Define the table for the component.
const table = 'tutorial';

export const tutorialService = {
    async create(item) {
        let columns = Object.keys(item);    
        let values  = Object.values(item);

        try {
            let createdRecord = await databaseService.insert(table, columns, values);
            return {
                insertedRecordId: createdRecord.lastInsertRowid
            }
        } catch (err){
            throw Error('Something happened trying to create the record.');
        }
    },
    async getAll(limit) {
        return databaseService.getAll(table, limit);
    },
    async get(id) {
        return databaseService.get(table, 'id', id);
    },
    async update(id, item) {
        let columns = Object.keys(item);    
        let values  = Object.values(item);

        try {
            let updatedRecord = await databaseService.update(table, id, columns, values);            
            if(updatedRecord.changes == 1){
                // Get the complete updated object to return.
                return this.get(id);
            }
        } catch (err){
            throw Error('Something happened trying to update the record.');
        }
    },
    async delete(id) {
        let deletedRecord = await databaseService.delete(table, id);
        if(deletedRecord.changes == 1) return true;
        else throw Error('Something happened trying to delete the record.');
    },
}

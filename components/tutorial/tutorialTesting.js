import assert from 'assert';
import { tutorialService } from './tutorialService.js';
import chai from 'chai'

let should = chai.should();
let expect = chai.expect;

const exampleTutorial = {
    title: "New Tutorial Title by Test",
    published_status: 1
};

const exampleTutorialUpdate = {
    title: "Updated Title by Test"
};

describe('Tutorial Testing', function () {
    console.log('Starting Testing.')

    let createdRecords = [];

    it('Should Create a Record', async function () {
        let record = await tutorialService.create(
            exampleTutorial,
        );

        record.should.be.an('object');
        record.insertedRecordId.should.be.a('number');
        
        //Pushing record to deletion.
        createdRecords.push(record.insertedRecordId);
    });

    it('Should Create a Record, and then Patch it', async function () {
        let record = await tutorialService.create(
            exampleTutorial,
        );
        
        //Pushing record to deletion.
        createdRecords.push(record.insertedRecordId);
        
        let updatedRecord = await tutorialService.update(
            record.insertedRecordId,
            exampleTutorialUpdate,
        )

        updatedRecord.should.be.an('object');
        updatedRecord.title.should.equal(exampleTutorialUpdate.title)
    });

    it('Should Create a Record, and then Get it', async function () {
        let record = await tutorialService.create(
            exampleTutorial,
        );
        
        //Pushing record to deletion.
        createdRecords.push(record.insertedRecordId);
        
        let getRecord = await tutorialService.get(
            record.insertedRecordId,
        )

        getRecord.should.be.an('object');
        getRecord.title.should.equal(exampleTutorial.title)
    });

    it('Should Create a Record, and then Get a List of Items', async function () {
        let record = await tutorialService.create(
            exampleTutorial,
        );
        
        //Pushing record to deletion.
        createdRecords.push(record.insertedRecordId);
        
        let getRecords = await tutorialService.getAll()
        getRecords.should.be.an('array');
        expect(getRecords.length).to.be.greaterThan(0);
    });

    it('Should Create a Record, and then Delete it', async function () {
        let record = await tutorialService.create(
            exampleTutorial,
        );

        let deleteRecord = await tutorialService.delete(record.insertedRecordId);
        deleteRecord.should.be.equal(true);
    });

    after(async function () {
        console.log('Running After Cleanup.');
        const deletions = [];

        for(let id of createdRecords){
            deletions.push(tutorialService.delete(id));
        }

        await Promise.all(deletions);
        console.log('Completed After Cleanup.');
    });
});
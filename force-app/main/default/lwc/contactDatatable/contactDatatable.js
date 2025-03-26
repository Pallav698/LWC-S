import { LightningElement, api, wire } from 'lwc';
const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', editable: true },
    { label: 'Email', fieldName: 'Email' , editable: true },
]
import getContacts from '@salesforce/apex/ContactsForDatatable.getContacts';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';


export default class ContactDatatable extends LightningElement {
    @api accountId;
    columns = COLUMNS;
    contacts = [];
    isLoaded = false;
    noContactsFlag = false;
    draftValues = [];
    wiredResults;

    @wire(getContacts, {accountId: '$accountId'})
    wiredContacts(value){
        this.wiredResults = value;
        const { data, error } = value;
        if(data){
            this.contacts = data;
            this.noContactsFlag = this.contacts.length === 0;
            this.isLoaded = true;
            console.log('accountId', this.accountId);
            console.log('contacts account', this.contacts);
        }else if(error){
            this.isLoaded = true;
            console.log('error ', error.body.message);
        }
    }

    handleSave(event){
        this.draftValues = event.detail.draftValues;
        console.log('this.draftValues ', this.draftValues);
        this.updateContacts();
    }

    updateContacts(){
        // Your logic to update contacts goes here
        const promises = this.draftValues.map(record => {
            const fields = {
                Phone: record.Phone,
                Email: record.Email,
                Id: record.Id
            
            }
            const recordInput = { fields };
            return updateRecord(recordInput);
            }
        );
        Promise.all(promises).then(() => {
            this.draftValues = [];
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contacts Updated',
                    variant: 'success',
                }),
            );
            return refreshApex(this.wiredResults);

        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or refreshing records',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
            this.draftValues = [];
            console.log('error ', error.body.message);

        });
    }

}
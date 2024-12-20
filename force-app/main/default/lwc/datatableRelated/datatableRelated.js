import { LightningElement, wire } from 'lwc';
import getContactsAndAccount from '@salesforce/apex/ContactsHandler.getContactsAndAccount';
const COLUMNS = [
    { label: 'Name', fieldName: 'Name', editable: true },
    { label: 'Email', fieldName: 'Email', editable: true },
    { label: 'Phone', fieldName: 'Phone', editable: true },
    { label: 'Account Name', fieldName: 'AccountName', editable: true }
];

export default class DatatableRelated extends LightningElement {
    columns = COLUMNS;
    contacts = [];
    
    @wire(getContactsAndAccount)
    contacts({ data, error}){
        if(data){
            this.contacts = data;
            this.contacts = data.map(contact => ({
                ...contact,
                AccountName: contact.Account?.Name || 'N/A' // Handle null Account gracefully
            }));
            console.log('this.contacts ',this.contacts);
            this.error = undefined;
        }
        if(error){
            this.error = error;
            this.contacts = undefined;
            console.error('Error fetching contacts: ', error.body.message);
        }
    }

    
}
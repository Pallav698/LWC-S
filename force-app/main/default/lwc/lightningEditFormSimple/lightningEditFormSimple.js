import { api, LightningElement, wire } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import { getRecord } from 'lightning/uiRecordApi';
const FIELDS = ['Name', 'Phone', 'Email'];


export default class LightningEditFormSimple extends LightningElement {
    @api recordId;
    objectApiName = CONTACT_OBJECT;
    

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contact;

    get name() {
        return this.contact?.data?.fields?.Name?.value;
    }

    // Getter for Phone field
    get phone() {
        return this.contact?.data?.fields?.Phone?.value;
    }

    // Getter for Email field
    get email() {
        return this.contact?.data?.fields?.Email?.value;
    }
}
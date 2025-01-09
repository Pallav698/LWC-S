import { api, LightningElement, wire } from 'lwc';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Contact.AccountId';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import { getRecord } from 'lightning/uiRecordApi';


export default class RecordFormSimple extends LightningElement {
    objectApiName = CONTACT_OBJECT;
    fields = [FIRST_NAME_FIELD, LAST_NAME_FIELD, EMAIL_FIELD, ACCOUNT_ID_FIELD];

    @api recordId;

    // @wire(getRecord, {recordId: '$recordId', fields: fields})
    // contact;
}
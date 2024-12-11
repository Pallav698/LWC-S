import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';

export default class RecordViewGetName extends LightningElement {
    @api recordId
    accountObject = ACCOUNT_OBJECT;
;
    @wire(getRecord, {recordId: '$recordId', fields: [NAME_FIELD]})
    account;



    get nameValue() {
        console.log('account ', this.account);
        // Access the Name field from the record data
        return this.account.data ? getFieldValue(this.account.data, NAME_FIELD) : '';
    }
}
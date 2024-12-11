import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_WEBSITE from '@salesforce/schema/Account.Website';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';

export default class LightningRecordEditForm extends LightningElement {
    @api recordId;
    data = [];

    // @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME, ACCOUNT_WEBSITE, ACCOUNT_INDUSTRY] })
    // wiredRecord({ error, data }) {
    //     if (data) {
    //         this.data = data;
    //         console.log('record ', this.data);
    //     } else if (error) {
    //         this.record = undefined;
    //         console.error('Error fetching record: ', error);
    //     }
    // }
}

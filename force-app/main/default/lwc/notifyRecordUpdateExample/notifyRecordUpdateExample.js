import { LightningElement, api, wire } from 'lwc';
import { getRecord, updateRecord, notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Account.Id';

export default class NotifyRecordUpdateExample extends LightningElement {
    @api recordId;
    account;

    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD, ACCOUNT_PHONE_FIELD] })
    wiredAccount({ error, data }) {
        if (data) {
            this.account = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleUpdate() {
        const fields = {};
        fields[ACCOUNT_ID_FIELD.fieldApiName] = this.recordId;
        fields[ACCOUNT_PHONE_FIELD.fieldApiName] = '1234567890';
        console.log('Updating phone number to 1234567890', fields);

        const recordInput = { fields };

        updateRecord(recordInput)
            .then(() => {
                console.log('Phone updated!');
                //notifyRecordUpdateAvailable([{ recordId: this.recordId }]); // ✅ Refresh LDS cache
            })
            .catch(error => console.error(error));
    }
}

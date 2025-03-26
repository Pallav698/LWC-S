import { LightningElement, wire, track } from 'lwc';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import getContactById from '@salesforce/apex/ContactController.getContactById';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const FIELDS = ['Contact.Email'];

export default class RefreshLDS extends LightningElement {
    recordId = '003GA000043o4JoYAI'; // Example Contact ID
    record;
    
    @track email;
    @track originalEmail;
    @track successMessage = '';
    @track isUpdating = false; // To disable the button during refresh

    @wire(getContactById, { contactId: '$recordId' })
    wiredContact({ data, error }) {
        if (data) {
            this.contact = data;
            this.email = this.contact.Email;
            this.originalEmail = this.contact.Email;
        } else if (error) {
            console.error('Error fetching contact:', error);
        }
    }

        // @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
        // wiredRecord(result) {
        //     this.record = result; // Store for refreshApex

        //     if (result.data) {
        //         console.log('Record Data:', JSON.stringify(result.data, null, 2));
        //         this.email = result.data.fields.Email.value;
        //         this.originalEmail = result.data.fields.Email.value;
        //     } else if (result.error) {
        //         console.error('Error fetching record:', result.error);
        //     }
        // }

    handleEmailChange(event) {
        this.email = event.target.value;
        this.successMessage = ''; // Clear message when editing
    }

    handleRefresh() {
        //if (this.record && this.record.data) {
            this.isUpdating = true; // Disable button
            const recordInput = {
                fields: {
                    Id: this.recordId,
                    Email: this.email // Use updated email
                }
            };

            updateRecord(recordInput)
                .then(() => {
                    this.successMessage = 'Record updated successfully!';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Record updated',
                            variant: 'success'
                        })
                    );

                    //return refreshApex(this.record);
                })
                .then(() => {
                    this.originalEmail = this.email; // Update originalEmail to show changes
                    this.isUpdating = false; // Re-enable button
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error updating record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                    this.isUpdating = false; // Re-enable button
                });
        //}
    }
}

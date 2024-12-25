import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactsHandler.getContacts';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import updateContact from '@salesforce/apex/ContactsHandler.updateContact';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name', editable: false },
    { label: 'Email', fieldName: 'Email', editable: true },
    { label: 'Phone', fieldName: 'Phone', editable: true },
    { label: 'Account Name', fieldName: 'AccountName', editable: false }
];

export default class DatatableRelated extends LightningElement {
    columns = COLUMNS;
    contacts = [];
    updatedValues = [];
    
    @wire(getContacts)
    wiredContacts(result) {
        this.wiredContactsResult = result; // Store the wired result for refresh
        const { data, error } = result;

        if(data){
            this.contacts = data;
            this.contacts = data.map(contact => ({
                ...contact,
                AccountName: contact.Account?.Name || 'N/A' // Handle null Account gracefully
            }));
            console.log('this.contacts ',this.contacts);
            this.error = undefined;
        }
        else if(error){
            this.error = error;
            this.contacts = undefined;
            console.error('Error fetching contacts: ', error.body.message);
        }
    }

    handleSave(event){
        this.updatedValues = event.detail.draftValues;
        console.log('this.updatedValues ',this.updatedValues);

        this.updateUsingApex();

        // const updatePromises = this.updatedValues.map(record => {
        //     const fields = {...record};
        //     console.log('fields', fields);
        //     return updateRecord( {fields} );
        // })

        // Promise.all(updatePromises)
        //     .then(() => {
        //         this.dispatchEvent(
        //             new ShowToastEvent({
        //                 title: 'Success',
        //                 message: 'Contact updated successfully!',
        //                 variant: 'success',
        //             })
        //         );
        //         this.draftValues = [];
        //     // Refresh data to reflect updates
        //     return refreshApex(this.wiredContactsResult);
        //     })
        //     .catch((error) => {
        //         let errorMessage = 'An error occurred';
        //         if (error.body && error.body.message) {
        //             errorMessage = error.body.message;
        //         }

        //         console.error('Error updating record:', error.message.body);
        //         this.dispatchEvent(
        //             new ShowToastEvent({
        //                 title: 'Error updating record',
        //                 message: errorMessage,
        //                 variant: 'error',
        //             })
        //         );
        //     });

    }

    updateUsingApex(){
        updateContact({contacts: this.updatedValues})
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact updated successfully!',
                        variant: 'success',
                    })
                );
                this.draftValues  = [];
                // Refresh data to reflect updates
                return refreshApex(this.wiredContactsResult);
            })
            .catch(error => {
                let errorMessage = 'An error occurred';
                if (error.body && error.body.message) {
                    errorMessage = error.body.message;
                }

                console.error('Error updating record:', error.message.body);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updating record',
                        message: errorMessage,
                        variant: 'error',
                    })
                );
            });
    }

    

    // handleCancel(){
    //     this.updatedValues = [];
    //     this.draftValues = [];
    // }

    
}
import { LightningElement } from 'lwc';
import getContacts from '@salesforce/apex/PaginationContact.getContacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PaginationLimitAndOffset extends LightningElement {
    contacts = [];
    page = 10;
    offset = 0;
    loader = false;
    previousDisabled = true;
    nextDisabled = false;

    connectedCallback() {
        this.loadContacts();
    }

    loadContacts(){
        getContacts({ page: this.page, offset: this.offset })
        .then(result => {
            this.loader = true;

            this.contacts = result;
            console.log('contacts', this.contacts);

            if(this.contacts.length < 10){
                this.nextDisabled = true;
            }
            
        })
        .catch(error => {
            this.loader = true;
            this.displayToast('Error', error.body.message, 'error');
        })
    }

    displayToast(title, message, variant){
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        })

        this.dispatchEvent(event);
    }

    handleNext(){
        this.page = 10;
        this.offset += 10;
        this.loader = false;
        this.previousDisabled = false;
        this.loadContacts();
    }

    handlePrevious(){
        if (this.offset > 0) {
            this.page = 10;
            this.offset -= 10;
            this.loader = false;
            this.loadContacts();
        }
        this.nextDisabled = false;
        this.previousDisabled = this.offset === 0;
    }
}
import { LightningElement } from 'lwc';
import getContactsAndAccount from '@salesforce/apex/ContactsHandler.getContactsAndAccount';

export default class DynamicSeacrh extends LightningElement {
    searchTimeout;
    isLoading = false;

    handleSearch(event){
        const searchTerm = event.target.value.trim();

        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        if(searchTerm !== ''){  
            this.isLoading = true;
            this.searchTimeout = setTimeout(() => {
                this.fetchContact(searchTerm);
            }, 300);
        } else {
            this.contacts = [];
        }
    }

    contacts = [];

    fetchContact(searchTerm){
        getContactsAndAccount({ searchTerm: searchTerm })
            .then(contacts => {
                this.contacts = contacts;
                console.log('this.contacts ', this.contacts);
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
}
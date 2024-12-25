import { LightningElement } from 'lwc';
import getContactsAndAccount from '@salesforce/apex/ContactsHandler.getContactsAndAccount';

export default class DynamicSeacrh extends LightningElement {
    handleSearch(event){
        const searchTerm = event.target.value.trim();

        if(searchTerm !== ''){
            this.fetchContact(searchTerm);
        }
        else{
            this.contacts = [];
        }
        
    }

    contacts = [];

    fetchContact(searchTerm){
        getContactsAndAccount({ searchTerm: searchTerm})
        .then(contacts => {
            this.contacts = contacts;
            console.log('this.contacts ',this.contacts);
        })
        .catch(error => {
            console.error('Error fetching contacts:', error);
        });
    }


}
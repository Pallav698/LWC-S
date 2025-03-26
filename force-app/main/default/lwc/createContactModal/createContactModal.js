import { api, LightningElement } from 'lwc';

export default class CreateContactModal extends LightningElement {
    @api showModal;
    @api accountId;

    connectedCallback(){
        console.log('accountId ', this.accountId);
    }

    
}
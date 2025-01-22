import { LightningElement, track, wire } from 'lwc';

import { getRecord } from 'lightning/uiRecordApi';
import getAccountData from '@salesforce/apex/AccountData.getAccountData';

export default class WireLifecycle extends LightningElement {
    @track accountId = '001GA00004sSKGNYA4';

    @wire(getAccountData)
    account({data, error}){
        console.log('hii');
        if(data){
            console.log('Account Data:', data);
        }
    }

    constructor() {
        super();
        console.log('Constructor: Initializing component');
    }

    connectedCallback() {
        console.log('ConnectedCallback: Component added to DOM');
        console.log('Wire data:', this.account);
    }

    renderedCallback() {
        console.log('RenderedCallback: Component rendering complete');
        console.log('Wire data:', this.account);
    }

    disconnectedCallback() {
        console.log('DisconnectedCallback: Component removed from DOM');
    }
}
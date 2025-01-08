import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import messageChannelName from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class SubscriberComponent extends LightningElement {
    receivedMessage = '';

    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            messageChannelName,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.receivedMessage = message.data ? message.data + ' - this is the message received in susbcriber component' : 'No message received';
    }

    
}
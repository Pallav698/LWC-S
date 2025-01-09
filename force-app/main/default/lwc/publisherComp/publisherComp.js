import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import messageChannelName from '@salesforce/messageChannel/SampleMessageChannel__c'

export default class PublisherComp extends LightningElement {
    @wire(MessageContext)
    messageContext;

    handleClick() {
        const message = {data: 'I \'m\ the publisher!', value: 10};

        publish(this.messageContext, messageChannelName, message);
    }
}
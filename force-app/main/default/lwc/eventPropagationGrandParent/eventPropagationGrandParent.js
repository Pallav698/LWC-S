import { LightningElement } from 'lwc';

export default class EventPropagationGrandParent extends LightningElement {
    handleButtonClick(event) {
        console.log('Button Clicked in Grand Parent');
        console.log('Event Detail: ', event.detail);
    }
}
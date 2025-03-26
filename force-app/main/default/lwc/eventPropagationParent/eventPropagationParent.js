import { LightningElement } from 'lwc';

export default class EventPropagationParent extends LightningElement {
    handleButtonClick(event) {
        console.log('Button Clicked in Parent');
        console.log('Event Detail: ', event.detail);
    }

    
}
import { LightningElement } from 'lwc';

export default class EventPropagationChild extends LightningElement {
    handleClick() {
        this.dispatchEvent(new CustomEvent('buttonclick', { bubbles: true, composed: false, detail: 'Event Propagation Child Clicked' }));
    }
}
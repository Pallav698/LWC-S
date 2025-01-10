import { LightningElement } from 'lwc';

export default class ChildComponent extends LightningElement {
    handleClick(event){
        const obj = {
            message: 'I have come from a child!',   
            value: 100
        };

        this.dispatchEvent(
            new CustomEvent('clickchild', {detail: obj})
        )
    }
}
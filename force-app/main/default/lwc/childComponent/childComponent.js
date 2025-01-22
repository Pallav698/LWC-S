import { LightningElement, api } from 'lwc';

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

    @api 
    handleClickFromParent(event){
        console.log('I have come from a parent');
    }

    @api childMessage = 'Child Message';
}
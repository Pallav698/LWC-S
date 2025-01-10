import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    message = '';
    value;

    handleClickChild(event){
        this.message = event.detail.message;
        this.value = event.detail.value;
        console.log('detail ', event.detail);
    }
}
import { api, LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    message = '';
    value;
    

    handleClickChild(event){
        this.message = event.detail.message;
        this.value = event.detail.value;
        console.log('detail ', event.detail);
    }

    handleClick(){
        this.template.querySelector('c-child-component').handleClickFromParent();
        console.log('Parent Component clicked ', this.template.querySelector('c-child-component').childMessage);
    }

    @api 
    getMessage(){
        return this.message;
    }

    getValue(){
        return this.value;
    }
}
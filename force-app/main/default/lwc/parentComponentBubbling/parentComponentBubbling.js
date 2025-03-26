import { LightningElement } from 'lwc';

export default class ParentComponentBubbling extends LightningElement {
    message;

    connectedCallback(){
        this.template.addEventListener('childclick', (event) =>{
            this.message = event.detail.message;
        });

        console.log(this.message);
        
    }
}
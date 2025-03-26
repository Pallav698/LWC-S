import { LightningElement } from 'lwc';

export default class ChildComponentBubbling extends LightningElement {
    name = '';
     age = '';

     renderedCallback(){
         this.dispatchEvent(new CustomEvent('childBubblingEvent', {
             detail: {
                 name: this.name,
                 age: this.age
             },
             
         }));
     }
}
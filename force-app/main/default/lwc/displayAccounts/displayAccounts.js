import { api, LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountForCombobox.getAccounts';

export default class DisplayAccounts extends LightningElement {
    options = [];
    accounts = [];
    selectedAccountId;

    @wire(getAccounts)
    wiredAccounts({data, error}){
        if(data){
            this.accounts = data;
            console.log('accounts ', this.accounts);
            this.options = this.accounts.map(account => {
                return {
                    label: account.Name,
                    value: account.Id
                }
            })
            this.options = [{
                label: 'None',
                value: 'null'
            }, ...this.options];
        }else if(error){
            this.error = error;
        }
    }

    get accountOptions(){
        return this.options;
    }

    handleAccountChange(event){
        this.selectedAccountId = event.detail.value;
        
        console.log('selectedAccountId ', this.selectedAccountId);
    }


}
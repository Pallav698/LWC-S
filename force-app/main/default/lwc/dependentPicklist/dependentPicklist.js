import { LightningElement, track, wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import Industry from '@salesforce/schema/Account.Industry';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

export default class DependentPicklist extends LightningElement {
    @track recordTypeOptions = [];
    @track industryOptions = [];

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo({ data, error }){
        if(data){
            console.log('data ',data);
        }
    }

    handleRecordTypeChange(){

    }

    handleIndustryChange(){

    }
}
import { LightningElement, wire } from 'lwc';
import getAccount from '@salesforce/apex/pagination.getAccount';

export default class Pagination extends LightningElement {
    currentPage = 1;

    @wire(getAccount)
    totalAccounts;

     
}
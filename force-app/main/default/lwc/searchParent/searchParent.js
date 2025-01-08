import { LightningElement } from 'lwc';

export default class SearchParent extends LightningElement {
    searchKey = '';
    handleSearch(event){
        const searchTerm = event.detail;
        console.log('searchTermParent: ' + searchTerm);
        this.searchKey = searchTerm;
    }
}
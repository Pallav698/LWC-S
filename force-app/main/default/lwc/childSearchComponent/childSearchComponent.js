import { LightningElement } from 'lwc';

export default class ChildSearchComponent extends LightningElement {
    handleSearch(event) {
        const searchTerm = event.detail.value;
        console.log('searchTermChild: ' + searchTerm);
        this.dispatchEvent(
            new CustomEvent('search', { detail: searchTerm})
        )
    }
}
import { LightningElement, track, wire } from 'lwc';
import getAccount from '@salesforce/apex/SearchableDatatableController.getAccount';
const COLUMNS = [
    { label: 'Name', fieldName: 'Name', type: 'text', sortable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Industry', fieldName: 'Industry', type: 'text' }
];

export default class SearchableDatatable extends LightningElement {

    columns = COLUMNS;
    records = [];
    searchTerm = '';
    allRecords = [];
    delay = 1000;

    @wire(getAccount)
    wiredAccounts({ error, data }) {
        if (data) {
            this.records = data;    
            this.allRecords = [...this.records];
            console.log('records:', data);
        } else if (error) {
            console.error(error);
        }
    }

    handleSearchTermChange(event) {
        clearTimeout(this.searchTimeout);
        this.searchTerm = event.target.value;
        console.log('searchTerm:', this.searchTerm);

        // Debouncing logic
        const searchTimeout = setTimeout(() => {
            this.filterAccounts();
            console.log('After 1000ms');
        }, this.delay);
        
    }

    filterAccounts() {
        if (this.searchTerm === '') {
            this.records = [...this.allRecords]; // Reset to original list
        } else {
            this.records = this.allRecords.filter(account =>
                account.Name.toLowerCase().includes(this.searchTerm)
            );
        }
        console.log('Filtered Accounts:', this.records);
    }
}
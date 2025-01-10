import { LightningElement, track } from 'lwc';

export default class Debouncing extends LightningElement {
    debounceTimeout = 1000;
    searchKey;
    searchResultsShow = false;
    @track filteredResults = [];
    @track searchResults = [
        { id: '1', title: 'Lea' },
        { id: '2', title: 'John' },
        { id: '3', title: 'Linda' },
        { id: '4', title: 'Michael' },
        { id: '5', title: 'Sara' },
        { id: '6', title: 'Tom' },
        { id: '7', title: 'Zoe' }
    ];


    handleSearchChange(event){
        this.searchKey = event.target.value;

        if(this.searchKey){
            this.searchResultsShow = true;
            this.filterSearch();
        }
        else{
            //this.filteredResults = [...this.searchResults];
            this.searchResultsShow = false;
        }
            
    }

    filterSearch(){
        clearTimeout(this.delaySearch);
        

        this.delaySearch = setTimeout(() => {
            this.filteredResults = this.searchResults.filter(result => {
                console.log('searchKey: ' + this.searchKey);
                return result.title.toLowerCase().includes(this.searchKey.toLowerCase());
            })
        }, 2000);

        if(this.filteredResults.length === 0){
            this.searchResultsShow = false;
        }

        
    }
}
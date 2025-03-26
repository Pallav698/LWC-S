import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import createContact from '@salesforce/apex/ContactController.createContact';

export default class ContactManager extends LightningElement {
    @track contacts = [];
    @track error;
    newContactName = '';

    // 1️⃣ Constructor - Called when the component is created
    constructor() {
        super();
        console.log('Constructor: Component is being created');
    }

    // 2️⃣ @wire - Fetch Contacts Automatically
    @wire(getContacts)
    wiredContacts({ error, data }) {
        if (data) {
            console.log('Component Wire: Data received', data);
            this.contacts = data;
        } else if (error) {
            console.error('Wire: Error fetching contacts', error);
            this.error = error;
        }
    }

    // 3️⃣ connectedCallback - Fires when component is inserted into DOM
    connectedCallback() {
        console.log('ConnectedCallback: Component is now in the DOM');
        // Can call imperative Apex here if needed
    }

    // Event handler for user input
    handleNameChange(event) {
        this.newContactName = event.target.value;
    }

    // Method to create a new contact
    createNewContact() {
        createContact({ name: this.newContactName })
            .then(() => {
                console.log('New contact created successfully');
            })
            .catch(error => {
                console.error('Error creating contact', error);
            });
    }

    // 4️⃣ renderedCallback - Fires after the component renders
    renderedCallback() {
        console.log('RenderedCallback: Component has been rendered');
    }

    // 5️⃣ disconnectedCallback - Fires when the component is removed
    disconnectedCallback() {
        console.log('DisconnectedCallback: Component is removed from DOM');
    }
}

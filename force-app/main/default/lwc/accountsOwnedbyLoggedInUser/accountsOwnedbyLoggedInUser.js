import { LightningElement, wire, track } from 'lwc';
import getAccount from '@salesforce/apex/AccountOwnedByLoggedInUserController.getAccount';
import deleteAccount from '@salesforce/apex/AccountOwnedByLoggedInUserController.deleteAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class AccountsOwnedbyLoggedInUser extends LightningElement {
    @track accounts = [];
    error;
    showModal = false;
    selectedAccountId;
    modalStyle;
    wiredResult;
    loader = true; // ✅ Show loader initially

    // Fetch accounts
    @wire(getAccount)
    wiredAccounts(value) {
        this.wiredResult = value;
        const { data, error } = value;

        if (data) {
            this.accounts = data;
            this.error = undefined;
        } else if (error) {
            this.accounts = []; // ✅ Ensure UI updates correctly
            this.error = error;
            this.showToast('Error', error.body.message, 'error');
        }
        this.loader = false; // ✅ Ensure loader is turned off after processing
    }

    // Open Create Contact Modal
    handleCreateContact(event) {
        this.selectedAccountId = event.currentTarget.dataset.id;
        this.showModal = true;
    
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
    
        const top = rect.top - 30;
        const left = rect.left;
    
        this.modalStyle = `position: absolute; top: ${top}px; left: ${left}px; 
            z-index: 1000; background: white; padding: 10px; border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);`;
    }

    // Delete Account
    handleDeleteAccount(event) {
        this.selectedAccountId = event.currentTarget.dataset.id;
        this.loader = true; // ✅ Show loader before deletion

        deleteAccount({ accountId: this.selectedAccountId })
            .then(() => {
                this.showToast('Success', 'Account deleted successfully', 'success');
                return refreshApex(this.wiredResult);
            })
            .then(() => {
                this.loader = false; // ✅ Hide loader after refresh
            })
            .catch(error => {
                this.showToast('Error', 'You cannot delete an Account with open opportunities!', 'error');
                console.error('Error deleting account:', error);
                this.loader = false; // ✅ Ensure loader turns off in case of error
            });
    }

    // Show Toast Notifications
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}

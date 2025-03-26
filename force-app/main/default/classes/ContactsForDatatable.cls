public with sharing class ContactsForDatatable {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id accountId) {
        return [SELECT Id, Name, Email, Phone FROM Contact WHERE AccountId = :accountId];
    }
}
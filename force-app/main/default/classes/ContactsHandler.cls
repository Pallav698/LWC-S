public with sharing class ContactsHandler {
    @auraEnabled(cacheable=true)
    public static List<Contact> getContactsAndAccount(String searchTerm){
        try {
            searchTerm = searchTerm + '%';
            return [
                SELECT Id, FirstName, Name, Email, Phone, Account.Name
                FROM Contact
                WHERE FirstName LIKE :searchTerm
                LIMIT 5
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @auraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        System.debug('I amd getting called');
        return [
            SELECT Id, FirstName, Name, Email, Phone, Account.Name
            FROM Contact WHERE AccountId != NULL
            LIMIT 5
        ];
    }

    @AuraEnabled
    public static void updateContact(List<Contact> contacts){
        try {
            update contacts;
            System.debug('receiving contact ' + contacts);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
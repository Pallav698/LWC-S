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
}
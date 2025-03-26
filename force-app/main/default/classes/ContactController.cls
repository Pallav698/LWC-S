public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [SELECT Id, Name FROM Contact LIMIT 10];
    }

    @AuraEnabled
    public static void createContact(String name) {
        Contact newContact = new Contact(LastName = name);
        insert newContact;
    }
}

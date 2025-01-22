public with sharing class PaginationContact {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Integer page, Integer offset){
        try {
            return [
                    SELECT Id, Name, Phone FROM Contact LIMIT :page OFFSET :offset
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
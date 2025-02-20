public with sharing class SearchableDatatableController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccount(){
        try {
            return [SELECT Id, Name, Phone, Industry FROM Account ORDER BY CreatedDate Limit 10];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
public with sharing class pagination {
    @AuraEnabled(cacheable=true)
    public static List<Account>  getAccount(){
        try {
            return [SELECT Id, Name, Phone FROM Account];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
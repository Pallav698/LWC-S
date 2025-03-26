public with sharing class AccountForCombobox {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account Order By CreatedDate Limit 3];
    }
}
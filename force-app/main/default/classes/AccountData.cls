public with sharing class AccountData {
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccountData() {
        return [
            SELECT Id, Name FROM Account LIMIT 5
        ];
    }
}
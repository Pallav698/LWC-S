public with sharing class TotalRevenueOfOpportunityBatch implements Database.Batchable<SObject>, Database.Stateful {
    public static Integer accountsUpdated = 0;
    public Database.QueryLocator start(Database.BatchableContext context) {
        return Database.getQueryLocator(
            'SELECT Amount, AccountId FROM Opportunity WHERE StageName = \'Closed Won\' AND AccountId != null'
        );
    }

    public void execute(Database.BatchableContext context, List<Opportunity> scope){
        Decimal tottalrevenue = 0.0;

        Map<Id, Decimal> accountOpportunityMap = new Map<Id, Decimal>();
        for(Opportunity opp : scope){
            if(accountOpportunityMap.containsKey(opp.AccountId)){
                accountOpportunityMap.put(opp.AccountId, accountOpportunityMap.get(opp.AccountId) + opp.Amount);
            }
            else{
                accountOpportunityMap.put(opp.AccountId, opp.Amount);
            }
        }

        List<Account> accountsToUpdate = [SELECT Id, AnnualRevenue FROM Account WHERE Id IN :accountOpportunityMap.keySet()];
        for(Account acc : accountsToUpdate){
            acc.AnnualRevenue = accountOpportunityMap.get(acc.Id);
        }

        update accountsToUpdate;

        accountsUpdated += accountsToUpdate.size();
    }

    public void finish(Database.BatchableContext context){
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
     mail.setToAddresses(new String[] {'iampallav698@gmail.com'});
     mail.setSubject('Batch Process Complete');
        mail.setPlainTextBody('Batch Process has been completed successfully' + accountsUpdated + 'records updated');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
    }
}
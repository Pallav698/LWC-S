public class AccountOwnedByLoggedInUserController {
    @AuraEnabled(cacheable=true)
    public static List<accountwrapper>  getAccount(){
        try {
            Set<Id> accountIds = new Set<Id>();
            List<Account> accounts = [SELECT Id, Name, Type, BillingState FROM Account WHERE OwnerId = :UserInfo.getUserId() AND Type != NULL AND BillingState != NULL Order By CreatedDate ];
            for(Account acc : accounts){
                accountIds.add(acc.Id);
            }

            Map<Id, Integer> accountVsOppCount = new Map<Id, Integer>();
            for(AggregateResult ar : [SELECT AccountId, Count(Id) oppCount FROM  Opportunity WHERE AccountId IN :accountIds Group By AccountId]){
                accountVsOppCount.put((Id)ar.get('AccountId'), (Integer)ar.get('oppCount'));
            }
            List<accountwrapper> accountList = new List<accountwrapper>();
            for(Account acc : accounts){
                accountwrapper aw = new accountwrapper();
                aw.accountId = acc.Id;
                aw.Name = acc.Name;
                aw.type = acc.Type;
                aw.billingState = acc.BillingState;
                aw.oppCount = accountVsOppCount.get(acc.Id);
                aw.recordPageLink = 'https://mainpracticeorg-dev-ed.develop.lightning.force.com/lightning/r/Account/'+acc.Id+'/view';

                accountList.add(aw);
            }
            return accountList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void deleteAccount(String accountId){
        List<Opportunity> oppLst = [SELECT Id, StageName FROM Opportunity 
                            WHERE AccountId = :accountId 
                            AND StageName NOT IN ('Closed Won', 'Closed Lost')];
                            

    if(!oppLst.isEmpty()){
        throw new AuraHandledException('Opportunity is in Open Stage, Cannot delete Account');
    } else {
        delete [SELECT Id FROM Account WHERE Id = :accountId];
    }

    }

    

    public class accountWrapper {
        @AuraEnabled
        public String accountId {get; set;}
        @AuraEnabled
        public String Name {get; set;}
        @AuraEnabled
        public String type {get; set;}
        @AuraEnabled
        public String billingState {get; set;}
        @AuraEnabled
        public Integer oppCount {get; set;}
        @AuraEnabled
        public String recordPageLink {get; set;}
        }
    
    //public accountWrapper(Id accountId, String Name, String type, String billingCountry, Integer oppCount) {
}
public with sharing class ContactTriggerHandlerTotalSum {
    public static void onInsertAndUndelete(List<Contact> newContact){
        Set<Id> accountIds = new Set<Id>();

        for(Contact c : newContact){
            if(c.AccountId != Null){
                accountIds.add(c.AccountId);
            }
        }

        List<Account> accounts = [SELECT Id, Total_Contacts__c FROM Account WHERE Id IN :accountIds];

        for(Account a : accounts){
            a.Total_Contacts__c = a.Total_Contacts__c + 1;
        }

        update accounts;
    }

    public static void onUpdate(Map<Id, Contact> oldMap, List<Contact> newContact){
        set<Id> accountIds = new Set<Id>();
        set<Id> oldAccountIds = new Set<Id>();

        for(Contact c : newContact){
            if(c.AccountId != Null){
                if(oldMap.get(c.Id).AccountId != c.AccountId){
                    accountIds.add(c.AccountId);
                    oldAccountIds.add(oldMap.get(c.Id).AccountId);
                }
            }
        }

        set<Id> allAccountIds = new Set<Id>();
        allAccountIds.addAll(accountIds);
        allAccountIds.addAll(oldAccountIds);

        List<Account> accounts = [SELECT Id, Total_Contacts__c FROM Account WHERE Id IN :allAccountIds];
        Map<Id, Account> accountMap = new Map<Id, Account>(accounts);
        //List<Account> oldAccounts = [SELECT Id, Total_Contacts__c FROM Account WHERE Id IN :oldAccountIds];

        for(Account a : accounts){
            if(accountMap.containsKey(a.Id)){
                a.Total_Contacts__c = a.Total_Contacts__c + 1;
            }
        }

        for(Account a : accounts){
            if(oldAccountIds.contains(a.Id)){
                a.Total_Contacts__c = a.Total_Contacts__c - 1;
            }
        }

        update accounts;
    }

    public static void onDelete(List<Contact> oldContact){
        Set<Id> accountIds = new Set<Id>();

        for(Contact c : oldContact){
            if(c.AccountId != Null){
                accountIds.add(c.AccountId);
            }
        }

        List<Account> accounts = [SELECT Id, Total_Contacts__c FROM Account WHERE Id IN :accountIds];

        for(Account a : accounts){
            a.Total_Contacts__c = a.Total_Contacts__c - 1;
        }

        update accounts;
    }
}
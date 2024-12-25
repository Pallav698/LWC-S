public with sharing class OpportunityCLosedLostBatch implements Database.Batchable<SObject> {
    public static List<Opportunity> OpportunityToUpdate = new List<Opportunity>();
   public Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator(
            'SELECT ID, stageName FROM OPPORTUNITY WHERE CreatedDate <: System.today().addDays(-90) AND Status != Closed Lost'
        );
   }

   public void execute(Database.BatchableContext bc, List<Opportunity> scope){
        //ist<Opportunity> OpportunityToUpdate = new List<Opportunity>();

        for(Opportunity opp : scope){
            opp.StageName = 'Closed Lost';
            OpportunityToUpdate.add(opp);
        }

        update OpportunityToUpdate;
   }

   public void finish(Database.BatchableContext bc){
     // Handle any errors or post-processing here
     Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
     mail.setToAddresses(new String[] {'iampallav698@gmail.com'});
     mail.setSubject('Batch Process Complete');
        mail.setPlainTextBody('Batch Process has been completed successfully' + OpportunityToUpdate.size() + 'records updated');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
   }
}
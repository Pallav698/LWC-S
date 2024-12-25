public with sharing class OpportunityBatchSchedule implements Schedulable{
    public void execute(SchedulableContext sc){
        OpportunityCLosedLostBatch batch = new OpportunityCLosedLostBatch();
        Database.executeBatch(batch);
    }
}
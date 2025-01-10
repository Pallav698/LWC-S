public with sharing class TotalRevenueScheduler implements Schedulable {
    public void execute(SchedulableContext context){
        Database.executeBatch(new TotalRevenueOfOpportunityBatch(), 200);
    }
}
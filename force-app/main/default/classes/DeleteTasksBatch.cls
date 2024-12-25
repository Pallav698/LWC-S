public with sharing class DeleteTasksBatch implements Batachable<SObject> {
    public void start(){
        return 'select id from tasks where' + 'status = completed and :System.today().addDays(-365)'
    }
}
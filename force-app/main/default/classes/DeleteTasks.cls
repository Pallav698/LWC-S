public with sharing class DeleteTasks implements Schedulable {
    public void execute(SchedulableContext sc){
        List<Task> taskList = [
            SELECT ID, STATUS FROM Task WHERE   Status = 'Completed'
            AND  CreatedDate < :System.today().addDays(-365)
        ];
    }
}
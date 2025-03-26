public with sharing class LoggedInUserTasks {
    @AuraEnabled(cacheable=true)
    public static List<Task> getTasks() {
        return [SELECT Id, Subject, ActivityDate, Status, WhoId, WhatId FROM Task WHERE OwnerId = :UserInfo.getUserId() ORDER BY ActivityDate DESC];
    }
}
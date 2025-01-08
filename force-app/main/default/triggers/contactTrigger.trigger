trigger contactTrigger on Contact (after insert, after update, after delete, after undelete) {
    if(trigger.isAfter && (trigger.isInsert || trigger.isUndelete)){
        ContactTriggerHandlerTotalSum.onInsertAndUndelete(trigger.new);
    }

    if(trigger.isAfter && trigger.isUpdate){
        ContactTriggerHandlerTotalSum.onUpdate(trigger.oldMap, trigger.new);
    }

    if(trigger.isAfter && trigger.isDelete){
        ContactTriggerHandlerTotalSum.onDelete(trigger.old);
    }
}
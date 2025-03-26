import { LightningElement, wire } from 'lwc';
import getTasks from '@salesforce/apex/LoggedInUserTasks.getTasks';
import TASK_OBJECT from '@salesforce/schema/Task';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

export default class TaskList extends LightningElement {
    tasks = [];
    
    taskInfo;P
    statusPicklistOptions = [];

    @wire(getObjectInfo, { objectApiName: TASK_OBJECT })
    wiredTaskInfo({ data, error }) {
        if (data) {
            this.taskInfo = data;
        } else if (error) {
            console.error('Error fetching Task object info', error);
        }
    }

    @wire(getPicklistValues, { recordTypeId: '$taskInfo.defaultRecordTypeId', fieldApiName: TASK_OBJECT.fields.Status })
    wiredPicklistValues({ data, error }) {
        if (data) {
            this.statusPicklistOptions = data.values;
        } else if (error) {
            console.error('Error fetching picklist values', error);
        }
    }

    connectedCallback() {
        console.log('Task Info:', this.taskInfo);

        getTasks()
            .then(result => {
                this.tasks = result;
            })
            .catch(error => {
                console.error('Error loading tasks', error);
            });
    }

    handleChange() {
        // Implementation for handling change
    }
}

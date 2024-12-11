import { LightningElement } from 'lwc';

export default class NamedSlots extends LightningElement {
    handleSlotChange(event) {
        const slot = event.target;
        const assignedNodes = slot.assignedNodes();
        console.log('Slot content changed:', assignedNodes);
    }
}
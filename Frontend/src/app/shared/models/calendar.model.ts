import { EventType } from '../enums/event-type.enum';

export class Calendar {
    constructor() {
        this.datesDisabled = [];
        this.isDisabled = false;
        this.maxDate = null;
        this.minDate = null;
        this.placement = "bottom";
        this.selectedDates = [];
        this.isMultipleAllow = true;
        this.startDate = null;
        this.endDate = null;
    }
    datesDisabled: EventDate[];
    isDisabled: boolean;
    maxDate: Date;
    minDate: Date;
    placement: "top" | "bottom" | "left" | "right";
    selectedDates: EventDate[];
    isMultipleAllow: boolean;
    startDate: string;
    endDate: string;
}

export class EventDate {
    title: string;
    selectedDate: string;
    backgroundColor: string;
    eventType: EventType;
}
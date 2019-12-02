import { EventEmitter } from '@angular/core';
import { EventType } from '../enums/event-type.enum';

export class Calendar{
    datesDisabled: EventDate[];
    isDisabled: boolean;
    maxDate: Date;
    minDate: Date;
    valueChange: EventEmitter<any> =new EventEmitter<any>();
    placement: "top" | "bottom" | "left" | "right";
    selectedDates: EventDate[];
    isMultipleAllow: boolean;
}

export class EventDate{
    title: string;
    selectedDate: Date;
    backgroundColor: string;
    eventType: EventType;
}
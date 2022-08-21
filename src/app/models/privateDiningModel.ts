import { Time } from "@angular/common";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class PrivateDiningModel {
    email: string;
    firstName: string;
    surname: string;
    phoneNumber: string;
    eventDate: NgbDateStruct;
    startTime: any;
    numberOfPeople: number;
    additionalInfo: string;
    key?:string;
    orderDate:Date;
    eventType?:EventTypeModel

}   

export class EventTypeModel{
    eventId:number;
    eventType:string;
};

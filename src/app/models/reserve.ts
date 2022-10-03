import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class ReserveModel {
    people: number;
    date: NgbDateStruct;
    constructor() {
        this.people = 1;
    };
};



export class GuestTime {
    place: string;
    time: string;
    status: boolean;
    date?: NgbDateStruct;
    key?: string;
    marketingConsent?: boolean;
    fullName?:string;
    phone?:string;
    email?:string;
    constructor() {
        this.marketingConsent = false;

    }
};


export class TableReservationModel {
    customer: {
        customer: string,
        marketing: boolean,
        uid: string,
    }
    key: string;
    deleteKey: string
    place: string;
    status: boolean;
    time: string;
    date: NgbDateStruct;
    UID: any;
};


export class DateRestriction {
    currentDate = new Date();
    year: number;
    month: number;
    day: number;
    constructor() {
        this.year = this.currentDate.getFullYear(),
            this.month = this.currentDate.getMonth() + 1,
            this.day = this.currentDate.getDate()
    };
};





















import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class ReserveModel {
    people: number;
    date: Date;
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
    place: string;
    status: boolean;
    time: string;
};
























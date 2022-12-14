import { CustomerMessageModel } from "./contact";
import { OrderModel } from "./order";
import { PrivateDiningModel } from "./privateDiningModel";
import { TableReservationModel } from "./reserve";

export enum Service {
    employee = 'employee',
    menu = 'menu',
    dish = 'dish'
};

export class Notifications {
    event:PrivateDiningModel[];
    table:TableReservationModel[];
    orders:OrderModel[];
    messages:CustomerMessageModel[]
};

export enum AdminList{
    employeeForm='employeeForm',
    menuForm='menuForm',
    timeForm='timeForm',
    dishForm='dishForm',
    colosedForm='colosedForm'
};


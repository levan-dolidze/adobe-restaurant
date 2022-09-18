import { DishModel } from "./dishModel";

export class OrderModel {
    key?:any;
    customerName: string;
    customerSurname: string;
    customerPN: string;
    customerAddress: string;
    customerMob: string;
    orderTime: any;
    userId: string;
    userEmail: string
    orderList: DishModel[];

};
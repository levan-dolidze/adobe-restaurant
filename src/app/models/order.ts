import { DishModel } from "./dishModel";

export class OrderModel {
    customerName: string;
    customerSurname: string;
    customerPN:string;
    customerAddress: string;
    orderTime:any;
    userId:string;
    userEmail:string
    orderList:DishModel;

};
import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { from,of, switchMap } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { DishModel } from '../models/dishModel';
import { OrderModel } from '../models/order';
import { OrderDoneMessageComponent } from '../order-done-message/order-done-message.component';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { SharedService } from '../services/shared.service';
import { fade } from '../shared/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [fade],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {

  constructor(private httpAuth: AuthService,
    private http: HttpService,
    private auth: AuthService,
    private dialog: MatDialog,
    private sharedService:SharedService
  ) { }

  dishList: Array<DishModel> = [];
  orderModel: OrderModel = new OrderModel();
  modalRef: MatDialogRef<any>
  ngOnInit(): void {
    this.returnDishList();
  };


  returnDishList() {
    let tempArr = [];
    let products = localStorage.getItem('dishes');
    if (products) {
      let dishList = JSON.parse(products)
      tempArr = dishList
      let uniqueProductsInCart: any = [
        ...new Map(tempArr.map((item: any) => [item.key, item])).values(),
      ];
      this.dishList = this.returnUniques(uniqueProductsInCart)
    };
  };


  returnUniques(uniqueProductsInCart: Array<DishModel>): Array<DishModel> {
    let uniqueDishListPerUser: Array<DishModel> = [];
    this.httpAuth.getToken().subscribe((token: any) => {
      uniqueDishListPerUser = uniqueProductsInCart.filter((item: any) => {
        return item.uid === token.uid
      })
    })
    return uniqueDishListPerUser
  };



  deleteDishList(i: any) {
    this.dishList.splice(i, 1)
    localStorage.setItem('dishes', JSON.stringify(this.dishList))
    this.http.cartChanges.next(this.dishList)
  };

  orderDish(dish: any) {
    if (dish.invalid) {
      return
    }
    else {
      this.auth.getToken().subscribe((res) => {
        if (!res) {
          this.dialog.open(LoginComponent)
        } else {
          let cart = localStorage.getItem('dishes');
          if (cart) {
            let cartList = JSON.parse(cart)
            this.http.addNewDishOrder(this.returnNewOrderModel(res, cartList)).subscribe(() => {
              this.modalRef = this.dialog.open(OrderDoneMessageComponent, {
                width: '300px',
                maxHeight: '90vh',
                data: { name: this.orderModel.customerName },
              });
              this.sharedService.notificationChange.next();
            })
          };
        };
      })
    };
  };

  returnNewOrderModel(response: any, cartList: any) {
    const newOrder: OrderModel = {
      customerName: this.orderModel.customerName,
      customerSurname: this.orderModel.customerSurname,
      customerPN: this.orderModel.customerPN,
      customerAddress: this.orderModel.customerAddress,
      customerMob: this.orderModel.customerMob,
      orderTime: new Date(),
      userId: response.uid,
      userEmail: response.email,
      orderList: cartList
    }
    return newOrder
  };




  get countTotalPrice() {
    let totalPrice = 0;
    from(this.dishList).pipe(
      switchMap(x => of(totalPrice += (x.price, x.price * x.inCart)))
    ).subscribe((res) => {
      totalPrice = res
    })
    return totalPrice
  };


};

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { from, map } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { DishModel } from '../models/dishModel';
import { OrderModel } from '../models/order';
import { OrderDoneMessageComponent } from '../order-done-message/order-done-message.component';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { fade } from '../shared/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [fade]
})
export class CartComponent implements OnInit {

  constructor(private httpAuth: AuthService,
    private http: HttpService,
    private auth: AuthService,
    private dialog: MatDialog
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
            const newOrder: OrderModel = {
              customerName: this.orderModel.customerName,
              customerSurname: this.orderModel.customerSurname,
              customerPN: this.orderModel.customerPN,
              customerAddress: this.orderModel.customerAddress,
              customerMob: this.orderModel.customerMob,
              orderTime: new Date(),
              userId: res.uid,
              userEmail: res.email,
              orderList: cartList
            }
            this.http.addNewDishOrder(newOrder).subscribe(() => {
              this.modalRef = this.dialog.open(OrderDoneMessageComponent, {
                width: '300px',
                maxHeight: '90vh',
                data: { name: this.orderModel.customerName },
              });
            })
          }
        }
      })
    }
  };


  get countTotalPrice() {
    let totalPrice = 0;
    from(this.dishList).pipe(
      map((x => totalPrice += (x.price * x.inCart)))
    ).subscribe((res) => {
      totalPrice = res;
    })
    return totalPrice
  };


};

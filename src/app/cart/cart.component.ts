import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, from, of, pipe, toArray } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { DishModel } from '../models/dishModel';
import { OrderModel } from '../models/order';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { fade } from '../shared/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [fade]
})
export class CartComponent implements OnInit {

  constructor(private httpAuth: AuthService,
    private http: HttpService,
    private auth: AuthService,
    private dialog: MatDialog
  ) { }

  dishList: DishModel[];
  orderModel: OrderModel = new OrderModel()

  ngOnInit(): void {
    this.returnDishList();
  };

  returnDishList() {
    let dish = localStorage.getItem('dishes');
    if (dish) {
      let dishList = JSON.parse(dish);
      this.httpAuth.getToken().subscribe((token: any) => {
        const uniqueDishListPerUser = dishList.filter((item: any) => {
          return item.uid === token.uid
        })
        this.dishList = uniqueDishListPerUser
      })
    } else {
      this.dishList = [];
    };
  };

  deleteDishList(i: any) {
    let dish = localStorage.getItem('dishes');
    if (dish) {
      let dishes = JSON.parse(dish);
      dishes.splice(i, 1)
      this.dishList = dishes
      localStorage.setItem('dishes', JSON.stringify(this.dishList))
      localStorage.setItem('cart', JSON.stringify(this.dishList.length))
      this.http.cartChanges.next(this.dishList.length)
    };
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
          let cart =localStorage.getItem('dishes');
          if(cart){
            let cartList=JSON.parse(cart)
            const newOrder: OrderModel = {
              customerName: this.orderModel.customerName,
              customerSurname: this.orderModel.customerName,
              customerPN: this.orderModel.customerName,
              customerAddress: this.orderModel.customerName,
              orderTime:new Date(),
              userId:res.uid,
              userEmail:res.email,
              orderList:cartList
            }
            this.http.addNewDishOrder(newOrder).subscribe(() => {
              //aq modali rom warmatebit sheukveta
            })}
        }
      })
    }
  };



};

import { Component, OnInit } from '@angular/core';
import { filter, from, of, pipe, toArray } from 'rxjs';
import { DishModel } from '../models/dishModel';
import { AuthService } from '../services/auth.service';
import { fade } from '../shared/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [fade]
})
export class CartComponent implements OnInit {

  constructor(private httpAuth: AuthService) { }

  dishList: DishModel[];

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
      this.dishList = []
    };
  };

  deleteDishList(key: any) {

  }



};

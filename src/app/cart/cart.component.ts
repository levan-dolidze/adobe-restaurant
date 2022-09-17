import { Component, OnInit } from '@angular/core';
import { DishModel } from '../models/dishModel';
import { fade } from '../shared/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations:[fade]
})
export class CartComponent implements OnInit {

  constructor() { }

  dishList: DishModel[]

  ngOnInit(): void {
    this.returnDishList();
  };

  returnDishList() {
    let dish = localStorage.getItem('dishes');
    if (dish) {
      let dishList = JSON.parse(dish);
      this.dishList = dishList
    } else {
      this.dishList = []
    };
  };

  deleteDishList(key:any){

  }



};

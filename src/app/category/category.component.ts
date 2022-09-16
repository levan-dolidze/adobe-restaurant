import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, from, Observable, of, toArray } from 'rxjs';
import { DishModel } from '../models/dishModel';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private http: HttpService) { }
  dishList$: Observable<any[]>;
  dishQTY: number = 0;

  ngOnInit(): void {
    this.returnCategory();
    this.returnDush();


  };

  returnCategory(): string | null {
    const category = this.route.snapshot.paramMap.get('category')
    return category
  };

  returnDush() {
    this.dishList$ = this.http.getDishList();
    this.dishList$.subscribe((res) => {
      from(res).pipe(
        filter((x => x.category === this.returnCategory())),
        toArray()
      ).subscribe((res) => {
        this.dishList$ = of(res)
      })
    })
  };

  incriceDish() {
    let cart = localStorage.getItem('cart');
    if (cart) {
      this.dishQTY = JSON.parse(cart)
      this.dishQTY += 1;
      this.http.cartChanges.next(this.dishQTY)
      localStorage.setItem('cart', JSON.stringify(this.dishQTY))
    } else {
      this.dishQTY += 1;
      this.http.cartChanges.next(this.dishQTY)
      localStorage.setItem('cart', JSON.stringify(this.dishQTY))
    }
  }

  
  decriceDish() {
    let qty = localStorage.getItem('cart');
    if (qty) {
      const QTY = JSON.parse(qty)
      this.dishQTY = QTY
      this.dishQTY -= 1
      this.http.cartChanges.next(this.dishQTY)
      localStorage.setItem('cart', JSON.stringify(this.dishQTY))
    }


  }


  // returnProductDetails(key: any) {
  //   let item = localStorage.getItem('dishes');
  //   if (item) {
  //     let selectedItem = JSON.parse(item);
  //     this.dishArr = selectedItem;
  //   };
  // };


  addDishToCart(dish: any) {
    let dishes = localStorage.getItem('dishes');
    if (dishes) {
      let dishInCart = JSON.parse(dishes);
      dishInCart.push(dish)
      const count = dishInCart.filter((obj: any) => obj.key === dish.key).length;
      dish.inCart = count
      localStorage.setItem('dishes', JSON.stringify(dishInCart));
    } else {
      let newDish = [];
      newDish.push(dish)
      localStorage.setItem('dishes', JSON.stringify(newDish));
    };
  };



};



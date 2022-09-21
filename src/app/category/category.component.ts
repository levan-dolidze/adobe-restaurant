import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, from, Observable, of, toArray } from 'rxjs';
import { DishModel } from '../models/dishModel';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private http: HttpService,
    private httpAuth: AuthService
  ) { }
  dishList$: Observable<DishModel[]>;
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

  incriceDish(dish: any) {
    let list = localStorage.getItem('dishes');
    if (list) {
      let cartList = JSON.parse(list)
      cartList.push(dish)
      // console.log(cartList)
      this.http.cartChanges.next(cartList)
      // localStorage.setItem('dishes', JSON.stringify(cartList))
    } else {
      let newList=[]
      newList.push(dish)
      this.http.cartChanges.next(newList)
      localStorage.setItem('dishes', JSON.stringify(newList))
    };
  };


  decriceDish(i: any) {
    let list = localStorage.getItem('dishes');
    if (list) {
      let cartList = JSON.parse(list)
      if (cartList === 0) {
        return
      } else {
        cartList.splice(i, 1)
        this.http.cartChanges.next(cartList)
        localStorage.setItem('dishes', JSON.stringify(cartList))
      }
    };
  };



  addDishToCart(dish: any) {
    this.httpAuth.getToken().subscribe((token) => {
      dish.uid = token.uid
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
    })


  };



};



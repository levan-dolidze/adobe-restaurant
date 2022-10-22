import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { filter, from, Observable, of, toArray } from 'rxjs';
import { DishDescriptionMessageComponent } from '../dish-description-message/dish-description-message.component';
import { DishModel } from '../models/dishModel';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private http: HttpService,
    private httpAuth: AuthService,
    public modal: MatDialog,
  ) { }
  dishList$: Observable<DishModel[]>;
  product: DishModel[];
  modalRef: MatDialogRef<any>

  ngOnInit(): void {
    this.returnCategory();
    this.returnDush();
  };

  dishDescription(dish: DishModel) {
    this.modalRef = this.modal.open(DishDescriptionMessageComponent, {
      width: '30%',
      maxHeight: '90vh',
      data: { chousenDish: dish },
    });

  }

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


  addDishToCart(dish: any) {
    this.httpAuth.getToken().subscribe((token) => {
      dish.uid = token.uid
      let list = localStorage.getItem('dishes');
      if (list) {
        let dishList = JSON.parse(list);
        const count = dishList.filter((obj: any) => obj.key === dish.key).length + 1;
        dish.inCart = count
        dishList.push(dish);
        this.http.cartChanges.next(dishList)
        localStorage.setItem('dishes', JSON.stringify(dishList));
      }
      else {
        let newDish = [];
        dish.inCart = 1
        newDish.push(dish)
        this.http.cartChanges.next(newDish)
        localStorage.setItem('dishes', JSON.stringify(newDish));
      }
    })
  };



  trackByKey(dish: any) {
    return dish ? dish.key : undefined
  };

  
};



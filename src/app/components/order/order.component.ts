import { Component, OnInit } from '@angular/core';
import { distinct, distinctUntilChanged, from, interval, Observable, of, take, tap, toArray } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { HttpService } from 'src/app/services/http.service';
import { fade } from 'src/app/shared/animations';
import { DishModel } from 'src/app/models/dishModel';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [fade]
})
export class OrderComponent implements OnInit {

  constructor(private http: HttpService,
    public loader: LoaderService,


  ) { }

  dishList$: Observable<DishModel[]>;

  ngOnInit(): void {
    this.returnDishList();
  };



  returnDishList() {
    this.dishList$ = this.http.getDishList();
    this.dishList$.subscribe((res) => {
      from(res).pipe(
        distinct(x => x.category),
        toArray(),
      ).subscribe((res) => {
        this.dishList$ = of(res)
      })
    })
  };


};







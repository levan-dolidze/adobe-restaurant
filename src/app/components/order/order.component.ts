import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, from, Observable, of, toArray } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { HttpService } from 'src/app/services/http.service';
import { fade } from 'src/app/shared/animations';

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

  dishList$: Observable<any>;

  ngOnInit(): void {
    this.returnDishList();
  };



  returnDishList() {
    this.dishList$ = this.http.getDishList();
    this.dishList$.subscribe((res) => {
      from(res).pipe(
        distinctUntilChanged((prev: any, curr: any) => { return (prev.category === curr.category)}),
        toArray()
      ).subscribe((res) => {
        this.dishList$ = of(res)
      })
    })
  };


};







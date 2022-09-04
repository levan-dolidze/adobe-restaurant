import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, filter, Observable, of } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { DishModel } from 'src/app/models/dishModel';
import { HttpService } from 'src/app/services/http.service';
import { fade } from 'src/app/shared/animations';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  animations: [fade]
})
export class OrderComponent implements OnInit {

  constructor(private http: HttpService,
    public loader: LoaderService,


  ) { }

  dishList$: Observable<any>
  ngOnInit(): void {
    this.returnDishList();

  };



  returnDishList() {
    this.dishList$ = this.http.getDishList();
    this.dishList$.subscribe((res) => {
      res.forEach((e:any)=>{
        of(e).pipe(
          distinctUntilChanged((prev, curr) => {
            return (prev.category == curr.category);
          })
        ).subscribe((res) => {
          console.log(res)
        })
   
      })
    
       
      
     

      this.dishList$ = of(res)
    })





  };


};



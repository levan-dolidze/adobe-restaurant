import { Component, OnInit } from '@angular/core';
import { Observable,from,of } from 'rxjs';
import { filter ,toArray} from 'rxjs/operators';
import { OrderModel } from '../models/order';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { LoaderService } from '../services/loader.service';
import { fade } from '../shared/animations';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss'],
  animations:[fade]
})
export class MyOrderComponent implements OnInit {

  constructor(private http: HttpService,
    private httpAdmin: AdminService,
    private httpAuth: AuthService,
    public loader: LoaderService,


  ) { }

  orderList$: Observable<OrderModel[]>

  ngOnInit(): void {
    this.returnMyOrders();
  };


  returnMyOrders() {
    this.orderList$ = this.httpAdmin.getOnlineOrders();
    this.orderList$.subscribe((res) => {
      this.httpAuth.getToken().subscribe((userInfo) => {
        from(res).pipe(
          filter((x => x.userId === userInfo.uid)),
          toArray()
        ).subscribe((res) => {
          console.log(res)
          this.orderList$ = of(res)
        })
      })
    })
  };

 
  cancelOnlineOrder(key: any) {
    this.httpAdmin.deleteOrder(key).subscribe((res) => {
      this.returnMyOrders()
    })
  };

};

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { OrderModel } from 'src/app/models/order';
import { AdminService } from 'src/app/services/admin.service';
import { LoaderService } from 'src/app/services/loader.service';
import { fade } from 'src/app/shared/animations';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
  animations: [fade]
})
export class AdminOrderComponent implements OnInit {

  constructor(private modal: MatDialog,
    private httpAdmin: AdminService,
    public loader: LoaderService,

  ) { }

  onlineOrderList$: Observable<OrderModel[]>

  ngOnInit(): void {
    this.returnOnlineOrders()
  };

  returnOnlineOrders() {
    this.onlineOrderList$ = this.httpAdmin.getOnlineOrders()
    this.onlineOrderList$.subscribe((res) => {
      this.onlineOrderList$ = of(res)
    })
  };

  cancelOnlineOrder(key: any) {
    this.httpAdmin.deleteOrder(key).subscribe((res) => {
      this.returnOnlineOrders()
    })
  };


};

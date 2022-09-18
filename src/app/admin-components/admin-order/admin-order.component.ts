import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from '@firebase/util';
import { OrderModel } from 'src/app/models/order';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  constructor(private modal: MatDialog, 
    private httpAdmin: AdminService) { }

  onlineOrderList$: Observable<OrderModel[]>
  
  ngOnInit(): void {
    this.returnOnlineOrders()

  };

  returnOnlineOrders() {
    // this.onlineOrderList$ = this.httpAdmin.getOnlineOrders()

  }




};

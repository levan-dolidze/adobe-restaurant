import { Component, OnInit,ChangeDetectionStrategy} from '@angular/core';
import { Observable} from 'rxjs';
import { OrderModel } from 'src/app/models/order';
import { AdminService } from 'src/app/services/admin.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SharedService } from 'src/app/services/shared.service';
import { fade } from 'src/app/shared/animations';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss'],
  animations: [fade],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AdminOrderComponent implements OnInit {

  constructor(private httpAdmin: AdminService,
              public loader: LoaderService,
              public sharedService:SharedService

  ) { }

  onlineOrderList$: Observable<OrderModel[]>

  ngOnInit(): void {
    this.returnOnlineOrders()
  };

  returnOnlineOrders() {
    this.onlineOrderList$ = this.httpAdmin.getOnlineOrders()
  };

  cancelOnlineOrder(key: any) {
    this.httpAdmin.deleteOrder(key).subscribe((res) => {
      this.sharedService.notificationChange.next();
      this.returnOnlineOrders()
    })
  };


};

import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { CustomerMessageModel } from '../../models/contact';
import { AdminService } from '../../services/admin.service';
import { LoaderService } from '../../services/loader.service';
import { fade } from '../../shared/animations';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.scss'],
  animations: [fade],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AdminContactComponent implements OnInit, OnDestroy {

  constructor(private httpAdmin: AdminService,
    public loader: LoaderService,
    private sharedService: SharedService

  ) { }
  customerMessage$: Observable<CustomerMessageModel[]>
  
  ngOnInit(): void {
    this.returnCustomerMessage();
  };

  returnCustomerMessage() {
    this.customerMessage$ = this.httpAdmin.getCustomerMessage();
  };

  deleteMessage(key: any) {
    this.httpAdmin.deleteCustomerMessage(key).subscribe(() => {
      this.sharedService.notificationChange.next();
      this.returnCustomerMessage()
    })
  };

  ngOnDestroy(): void {

  };

};

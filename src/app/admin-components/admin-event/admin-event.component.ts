import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { PrivateDiningModel } from 'src/app/models/privateDiningModel';
import { AdminService } from 'src/app/services/admin.service';

import { fade } from 'src/app/shared/animations';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.css'],
  animations: [fade]

})
export class AdminEventComponent implements OnInit, OnDestroy {

  constructor(private http: AdminService,
             public loader:LoaderService) { }

  privateDining$: Observable<PrivateDiningModel[]>
  orderedDiningDelete$ = new Subscription();
  ngOnInit(): void {
    this.returnDining();
  };


  returnDining() {
    this.privateDining$ = this.http.returnPrivateDining();
    this.privateDining$.subscribe((res) => {
      this.privateDining$ = of(res)
    })
  };

  deleteDiningEvent(key: any) {
    this.http.deleteOrderedDiningEvent(key).subscribe((res) => { })
    this.orderedDiningDelete$ = this.http.orderedDiningDelete$.subscribe((response) => {
      this.privateDining$=response
    })
  };


  ngOnDestroy(): void {
    this.orderedDiningDelete$.unsubscribe()
  }

};

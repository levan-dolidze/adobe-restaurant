import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { PrivateDiningModel } from 'src/app/models/privateDiningModel';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.css']
})
export class AdminEventComponent implements OnInit, OnDestroy {

  constructor(private http: AdminService) { }

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

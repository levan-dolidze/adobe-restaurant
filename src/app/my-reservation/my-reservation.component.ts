import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, from, Observable, of, toArray } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { TableReservationModel } from '../models/reserve';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { fade } from '../shared/animations';

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.scss'],
  animations: [fade]
})
export class MyReservationComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpService,
    private httpAuth: AuthService,
    public loader: LoaderService,
    private httpAdmin: AdminService
  ) { }
  myReservations$: Observable<TableReservationModel[]>;
  loaderSpin: boolean = false;
  ngOnInit(): void {
    this.returnMyReservations();
  };

  ngAfterViewInit(): void {
    this.loader.isLoading.subscribe((res) => {
      setTimeout(() => {
        this.loaderSpin = res
      }, 0);

    })


  }

  returnMyReservations() {
    this.myReservations$ = this.http.getMyReservations();
    this.myReservations$.subscribe((res) => {
      this.httpAuth.getToken().subscribe((userInfo) => {
        from(res).pipe(
          filter((x => x.customer.uid === userInfo.uid)),
          toArray()
        ).subscribe((res) => {
          this.myReservations$ = of(res)
        })
      })
    })
  };



  cancelReservation(deleteKey: any) {
    this.http.deleteMyTableReservation(deleteKey).subscribe((res: any) => {
      this.returnMyReservations()

    })

  };


  cancelTableBooking(key: any, deleteKey: any) {
    this.httpAdmin.cancelTableTime(key).subscribe((res) => {
      this.cancelReservation(deleteKey)
    })
  };
};

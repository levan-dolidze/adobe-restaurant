import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { TableReservationModel } from 'src/app/models/reserve';
import { AdminService } from 'src/app/services/admin.service';
import { HttpService } from 'src/app/services/http.service';
import { fade } from 'src/app/shared/animations';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.css'],
  animations: [fade]

})
export class AdminReservationComponent implements OnInit {

  constructor(private httpAdmin: AdminService,
    public loader: LoaderService,
    private httpService: HttpService

  ) { }

  tableReservations$: Observable<TableReservationModel[]>
   
  key:any
  ngOnInit(): void {
    this.returnTableReservations();
    this.getGuestTimes();
  };


  getGuestTimes() {
    this.httpService.getGuestTime().subscribe((res)=>{
      for (const iterator of res) {
        this.key=iterator.key
      };
    })
  };


  returnTableReservations() {
    this.tableReservations$ = this.httpAdmin.getTableReservations();
    this.tableReservations$.subscribe((res) => {
      this.tableReservations$ = of(res)
    })
  };


  deleteTableReservation(key: any) {
    this.httpAdmin.deleteTableReservation(key).subscribe((res) => {
      this.cancelTableBooking();
      this.httpAdmin.tableReservationDetele$.subscribe((updatedReservations) => {
        this.tableReservations$ = updatedReservations;
      })
    })
  };

  cancelTableBooking() {
    this.httpAdmin.cancelTableTime(this.key).subscribe((res) => {
    })
  };


};

import { Component, OnInit } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
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

  ngOnInit(): void {
    this.returnTableReservations();
  };

  returnTableReservations() {
    this.tableReservations$ = this.httpAdmin.getTableReservations();
    this.tableReservations$.subscribe((res) => {
      this.tableReservations$ = of(res)
    })
  };

  deleteTableReservation(deleteKey: any) {
    this.httpAdmin.deleteTableReservation(deleteKey).subscribe((res) => {
    })
  };

  cancelTableBooking(key: any, deleteKey: any) {
    this.httpAdmin.cancelTableTime(key).subscribe((res) => {
      this.deleteTableReservation(deleteKey)
      this.httpAdmin.tableReservationDetele$.subscribe((updatedReservations) => {
        this.tableReservations$ = updatedReservations;
        this.returnTableReservations();
      })
    })
  };



};

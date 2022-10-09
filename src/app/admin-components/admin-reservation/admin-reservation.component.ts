import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { TableReservationModel } from 'src/app/models/reserve';
import { AdminService } from 'src/app/services/admin.service';
import { fade } from 'src/app/shared/animations';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.scss'],
  animations: [fade],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AdminReservationComponent implements OnInit, OnDestroy {

  constructor(private httpAdmin: AdminService,
    public loader: LoaderService,
    private sharedService: SharedService

  ) { }

  tableReservations$: Observable<TableReservationModel[]>;
  subscription$ = new Subscription()

  ngOnInit(): void {
    this.returnTableReservations();
  };

  returnTableReservations() {
    this.tableReservations$ = this.httpAdmin.getTableReservations();

  };

  deleteTableReservation(deleteKey: any) {
    this.httpAdmin.deleteTableReservation(deleteKey).subscribe((res) => {
      this.sharedService.notificationChange.next();
    })
  };

  cancelTableBooking(key: any, deleteKey: any) {
    this.httpAdmin.cancelTableTime(key).subscribe((res) => {
      this.deleteTableReservation(deleteKey)
      this.subscription$ = this.httpAdmin.tableReservationDetele$.subscribe((updatedReservations) => {
        this.tableReservations$ = updatedReservations;
        this.returnTableReservations();
      })
    })
  };

  ngOnDestroy() {
    this.subscription$.unsubscribe();

  }



};

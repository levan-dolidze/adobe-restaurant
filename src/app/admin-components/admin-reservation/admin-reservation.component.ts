import { Component, OnInit,ChangeDetectionStrategy} from '@angular/core';
import { Observable } from 'rxjs';
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
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class AdminReservationComponent implements OnInit {

  constructor(private httpAdmin: AdminService,
    public loader: LoaderService,
    private sharedService:SharedService

  ) { }

  tableReservations$: Observable<TableReservationModel[]>

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
      this.httpAdmin.tableReservationDetele$.subscribe((updatedReservations) => {
        this.tableReservations$ = updatedReservations;
        this.returnTableReservations();
      })
    })
  };



};

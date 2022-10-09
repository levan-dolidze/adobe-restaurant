import { Component,OnDestroy, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { filter, from, Observable, Subscription, toArray } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { EventTypeModel, PrivateDiningModel } from 'src/app/models/privateDiningModel';
import { AdminService } from 'src/app/services/admin.service';
import { HttpService } from 'src/app/services/http.service';
import { fade, show } from 'src/app/shared/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminMessageComponent } from 'src/app/admin-message/admin-message.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.scss'],
  animations: [fade, show],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class AdminEventComponent implements OnInit, OnDestroy {

  constructor(private httpAdmin: AdminService,
    private http: HttpService,
    public loader: LoaderService,
    private dialog: MatDialog,
    private sharedService:SharedService

  ) { }

  privateDining$: Observable<PrivateDiningModel[]>
  orderedDiningDelete$ = new Subscription();
  eventTypeModel: EventTypeModel = new EventTypeModel();
  modalRef: MatDialogRef<any>
  ngOnInit(): void {
    this.returnDining();
  };


  returnDining() {
    this.privateDining$ = this.httpAdmin.returnPrivateDining();
  };

  deleteDiningEvent(key: any) {
    this.httpAdmin.deleteOrderedDiningEvent(key).subscribe((res) => { 
      this.sharedService.notificationChange.next()
    })
    this.orderedDiningDelete$ = this.httpAdmin.orderedDiningDelete$.subscribe((response) => {
      this.privateDining$ = response;

      this.returnDining();
    })
  };



  addNewEventType(form: any) {
    if (form.invalid) {
      return
    }
    else {
      this.http.getEventTypes().subscribe((res) => {
        from(res).pipe(
          filter((x => x.eventId === this.eventTypeModel.eventId ||
            x.eventType === this.eventTypeModel.eventType)),
          toArray(),
        ).subscribe((resp) => {
          if (resp.length > 0) {
            return
          } else {
            const newEvent: EventTypeModel = {
              eventType: this.eventTypeModel.eventType,
              eventId: this.eventTypeModel.eventId
            }
            this.http.addEventType(newEvent).subscribe((response) => {

              this.modalRef = this.dialog.open(AdminMessageComponent, {
                width: '300px',
                maxHeight: '90vh',
                data: { event: this.eventTypeModel.eventType },
              });
            })
          };

        })
      })
    };
  };



  ngOnDestroy(): void {
    this.orderedDiningDelete$.unsubscribe();
  };

};

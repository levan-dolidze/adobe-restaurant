import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable} from 'rxjs';
import { EventMessageComponent } from 'src/app/event-message/event-message.component';
import { LoginComponent } from 'src/app/login/login.component';
import { EventTypeModel, PrivateDiningModel } from 'src/app/models/privateDiningModel';
import { DateRestriction } from 'src/app/models/reserve';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { SharedService } from 'src/app/services/shared.service';
import { fade } from 'src/app/shared/animations';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  animations: [fade],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {

  privateDiningModel: PrivateDiningModel = new PrivateDiningModel();
  eventTypes$: Observable<EventTypeModel[]>;
  currentDate = new DateRestriction();

  eventTableArray: Array<any> = [
    {
      image: 'https://thumbs.dreamstime.com/z/family-sitting-together-restaurant-party-concept-birthday-160638781.jpg'
    },
    {
      image: 'https://thumbs.dreamstime.com/z/family-sitting-together-restaurant-party-concept-birthday-160638781.jpg'
    },
    {
      image: 'https://thumbs.dreamstime.com/z/family-sitting-together-restaurant-party-concept-birthday-160638781.jpg'
    },
    {
      image: 'https://thumbs.dreamstime.com/z/family-sitting-together-restaurant-party-concept-birthday-160638781.jpg'
    },
  ]

  constructor(private http: HttpService,
    private authService: AuthService,
    private dialog: MatDialog,
    config: NgbTimepickerConfig,
    private sharedService:SharedService

  ) {
    config.spinners = false;
  }

  ngOnInit(): void {
    this.returnEventTypes()
  };


  returnEventTypes() {
    this.eventTypes$ = this.http.getEventTypes();
  };

  submitPrivateEvent(form: any) {
    if (form.invalid) {
      return
    } else {
      this.authService.getToken().subscribe((res) => {
        if (res) {
          const obj: PrivateDiningModel = {
            email: this.privateDiningModel.email,
            firstName: this.privateDiningModel.firstName,
            surname: this.privateDiningModel.surname,
            phoneNumber: this.privateDiningModel.phoneNumber,
            eventDate: this.privateDiningModel.eventDate,
            startTime: this.privateDiningModel.startTime,
            numberOfPeople: this.privateDiningModel.numberOfPeople,
            additionalInfo: this.privateDiningModel.additionalInfo,
            orderDate: new Date(),
            eventType: this.privateDiningModel.eventType
          }
          this.http.addPrivateEvent(obj).subscribe((res) => {
            this.dialog.open(EventMessageComponent)
          })
          this.sharedService.notificationChange.next();
        }
        else {
          this.dialog.open(LoginComponent)
        }
      })
    };
  };



};

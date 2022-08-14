import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventMessageComponent } from 'src/app/event-message/event-message.component';
import { LoginComponent } from 'src/app/login/login.component';
import { PrivateDiningModel } from 'src/app/models/privateDiningModel';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  privateDiningModel: PrivateDiningModel = new PrivateDiningModel();
  constructor(private http: HttpService,
     private authService: AuthService,
     private dialog: MatDialog
     ) { }

  ngOnInit(): void {

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
            orderDate: new Date()
          }
          this.http.addPrivateEvent(obj).subscribe((res) => { 

            this.dialog.open(EventMessageComponent)
            // form.reset();
          })

        }
        else {
         this.dialog.open(LoginComponent)

        }
      })
    };
  };



};

import { Component, OnInit } from '@angular/core';
import { PrivateDiningModel } from 'src/app/models/privateDiningModel';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  privateDiningModel: PrivateDiningModel = new PrivateDiningModel();
  constructor(private http: HttpService) { }

  ngOnInit(): void {

  };

  submitPrivateEvent(form: any) {
    if (form.invalid) {
      return
    } else {
      const obj: PrivateDiningModel = {
        email: this.privateDiningModel.email,
        firstName: this.privateDiningModel.firstName,
        surname: this.privateDiningModel.surname,
        phoneNumber: this.privateDiningModel.phoneNumber,
        eventDate: this.privateDiningModel.eventDate,
        startTime: this.privateDiningModel.startTime,
        numberOfPeople: this.privateDiningModel.numberOfPeople,
        additionalInfo: this.privateDiningModel.additionalInfo

      }
      this.http.addPrivateEvent(obj).subscribe((res)=>{

      })
    }

  }


};

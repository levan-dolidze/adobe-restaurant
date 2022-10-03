import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GuestTime } from '../models/reserve';
import { AdminService } from '../services/admin.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-reserve-input-message',
  templateUrl: './reserve-input-message.component.html',
  styleUrls: ['./reserve-input-message.component.scss']
})
export class ReserveInputMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { reserveDate: any },
    private adminHttp: AdminService

  ) { }
  reservation: GuestTime;
  ngOnInit(): void {
    this.reservation = this.data.reserveDate;

  }

  addReserve(form:any) {
    if(form.invalid){
      return
    }
    else{
      const newReservation: GuestTime = {
        place: this.reservation.place,
        time: this.reservation.time,
        status: false,
        date: this.reservation.date,
        marketingConsent: this.reservation.marketingConsent,
        fullName: this.reservation.fullName,
        phone: this.reservation.phone,
        email: this.reservation.email
      }
      this.adminHttp.reservByAdmin(newReservation).subscribe(() => {
  
      })
    }


  }

}

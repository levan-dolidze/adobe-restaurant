import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GuestTime } from '../models/reserve';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-reserve-input-message',
  templateUrl: './reserve-input-message.component.html',
  styleUrls: ['./reserve-input-message.component.scss']
})
export class ReserveInputMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { reserveDate: any },
    private http: HttpService

  ) { }
  reservation: GuestTime;
  ngOnInit(): void {
    this.reservation = this.data.reserveDate;

  }

  addReserve() {
    // const newReservation: GuestTime = {
      

    // }
    // this.http.reservByAdmin().subscribe(() => {

    // })

  }

}

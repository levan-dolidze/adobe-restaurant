import { Component, OnInit } from '@angular/core';
import { GuestTime } from '../models/reserve';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-timemodal',
  templateUrl: './timemodal.component.html',
  styleUrls: ['./timemodal.component.css']
})
export class TimemodalComponent implements OnInit {

  constructor(private http: AdminService) { }
  guestTime: GuestTime = new GuestTime();
  guestTimes: Array<GuestTime> = [];





  ngOnInit(): void {

  };





  addTime(form: any) {
    if (form.invalid) {
      return
    } else {
      const time: GuestTime = {
        time: this.guestTime.time,
        place: this.guestTime.place,
        status:true,
        date:this.guestTime.date
      }
      this.http.addGuestTime(time).subscribe((res) => {

      })
    }





  };
};

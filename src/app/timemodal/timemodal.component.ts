import { Component, OnInit } from '@angular/core';
import { GuestTime } from '../models/reserve';

@Component({
  selector: 'app-timemodal',
  templateUrl: './timemodal.component.html',
  styleUrls: ['./timemodal.component.css']
})
export class TimemodalComponent implements OnInit {

  constructor() { }
  guestTime: GuestTime = new GuestTime();
  guestTimes: Array<GuestTime> = [];





  ngOnInit(): void {

  };


  addTime(form: any) {


  };
};

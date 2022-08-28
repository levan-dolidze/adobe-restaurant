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






  ngOnInit(): void {

  };


};

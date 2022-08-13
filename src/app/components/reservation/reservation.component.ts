import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  people:Array<number>=[1,2,4,6,8]
  constructor(public modal: MatDialog,
  ) { }

  ngOnInit(): void {
  }

}

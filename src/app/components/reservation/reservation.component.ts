import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ReserveModel } from 'src/app/models/reserve';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  people: Array<number> = [1,2,3,4,5,6,7,8];
  reserveModel: ReserveModel = new ReserveModel();
  constructor(public modal: MatDialog,
  ) { }

  ngOnInit(): void {

  };

  findTable(findTableForm: any) {

  };

};

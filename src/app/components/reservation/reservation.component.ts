import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/login/login.component';
import { ReserveModel } from 'src/app/models/reserve';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  people: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
  reserveModel: ReserveModel = new ReserveModel();
  constructor(public modal: MatDialog,
              private auth: AuthService
  ) { }

  ngOnInit(): void {

  };

  findTable(findTableForm: any) {
    if (findTableForm.invalid) {
      return
    }
    else {
      this.auth.getToken().subscribe((res) => {
        if (res) {
          //aq unda gaigzavnos dareservebis req
        }
        else {
          this.modal.open(LoginComponent)
          
        }
      })
    }
  };





};

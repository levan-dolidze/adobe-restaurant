import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';
import { GuestTime, ReserveModel } from 'src/app/models/reserve';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {

  people: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
  timeList: GuestTime[];


  reserveModel: ReserveModel = new ReserveModel();
  selectDay: boolean = true;



  constructor(public modal: MatDialog,
    private auth: AuthService
  ) {


  }

  ngOnInit(): void {


  };



  timeDetection(time: any) {
    console.log(time)

  }




  findTable(findTableForm: any) {
    if (findTableForm.invalid) {
      return
    }
    else {
      this.auth.getToken().subscribe((res) => {
        if (res) {
          this.selectDay = false;
          //aq unda gaketdes reqi backshi,gadaeces parametrad 
          //person raodenoba da dge
          //
        }
        else {

          this.modal.open(LoginComponent)

        }
      })
    }
  };





};


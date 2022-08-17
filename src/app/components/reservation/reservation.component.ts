import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { LoginComponent } from 'src/app/login/login.component';
import { GuestTime, ReserveModel } from 'src/app/models/reserve';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {

  people: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
  timeList$: Observable<GuestTime[]>;

  isDisabled = (date: NgbDate, current: { month: number }) => date.day === 13;

  reserveModel: ReserveModel = new ReserveModel();
  selectDay: boolean = true;
  viewMode = 'selectDay';

  reserveTime: string;
  reservePlace: string
  reserve: any


  constructor(public modal: MatDialog,
    private auth: AuthService,
    private http: HttpService
  ) {


  }

  ngOnInit(): void {
    this.returnGuestTimes();


  };

  returnGuestTimes() {
    this.timeList$ = this.http.getGuestTime();
    this.timeList$.subscribe((res) => {
      this.timeList$ = of(res)
    })

  }


  timeDetection(reserve: any) {
    if (reserve.status === false) {
      return
    } else {
      this.viewMode = 'reserve'
      this.reserveTime = reserve.time
      this.reservePlace = reserve.place
      this.reserve = reserve;
    }
  };




  findTable(findTableForm: any) {
    if (findTableForm.invalid) {
      return
    }
    else {
      this.viewMode = 'selectTime';
      //aq unda gaketdes reqi backshi,gadaeces parametrad 
      //person raodenoba da dge
      //
    }


  };


  completeReservation(form: any) {
    if (form.invalid) {
      return
    } else {
      this.auth.getToken().subscribe((res) => {
        if (res) {
          console.log(this.reserve)
          this.http.reserveGuestTime(this.reserve).subscribe(() => {
            this.viewMode = 'reserveComplete';
          })
        }
        else {
          this.modal.open(LoginComponent)
        }
      })
    }
  };





};


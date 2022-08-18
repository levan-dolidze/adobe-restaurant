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
  reserveInfo: GuestTime = new GuestTime();


  reserveModel: ReserveModel = new ReserveModel();
  selectDay: boolean = true;
  viewMode = 'selectDay';
  reserve: any
  marketingConsent: boolean = true

  constructor(public modal: MatDialog,
    private auth: AuthService,
    private http: HttpService
  ) {


  }

  ngOnInit(): void {
    this.returnGuestTimes();


  };


  onChange(e: any) {
    this.reserveInfo.marketingConsent = e.checked;
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
      this.reserveInfo.time = reserve.time
      this.reserveInfo.place = reserve.place
      this.reserve = reserve;
    }
  };




  findTable(findTableForm: any) {
    if (findTableForm.invalid) {
      return
    }
    else {
      this.viewMode = 'selectTime';
    }
  };


  completeReservation(form: any) {
    if (form.invalid) {
      return
    } else {
      this.auth.getToken().subscribe((res) => {
        if (res) {
          this.reserve.customer = {
            customer: res.email,
            uid: res.uid,
            marketing: this.reserveInfo.marketingConsent
          };
          this.http.bookingTable(this.reserve).subscribe(() => {
            this.addReservation(this.reserve)
            this.viewMode = 'reserveComplete';

          })
        }
        else {
          this.modal.open(LoginComponent)
        }
      })
    }
  };

  addReservation(reservation: any) {
    this.http.completeReservation(reservation).subscribe((res) => {

    })
  }



};


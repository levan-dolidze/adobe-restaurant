import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginComponent } from 'src/app/login/login.component';
import { DateRestriction, GuestTime, ReserveModel } from 'src/app/models/reserve';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { fade } from 'src/app/shared/animations';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  animations: [fade],
  // changeDetection:ChangeDetectionStrategy.OnPush
})

export class ReservationComponent implements OnInit {

  people: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
  timeList$: Observable<GuestTime[]>;
  reserveInfo: GuestTime = new GuestTime();


  reserveModel: ReserveModel = new ReserveModel();
  currentDate = new DateRestriction();
  selectDay: boolean = true;
  viewMode = 'selectDay';
  reserve: any
  marketingConsent: boolean = true;



  constructor(public modal: MatDialog,
    private auth: AuthService,
    private http: HttpService,
    public loader: LoaderService,
    private sharedService:SharedService

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
  }


  timeDetection(reserve: any) {
    if (reserve.status === false) {
      return
    } else {
      this.viewMode = 'reserve';
      this.reserveInfo.time = reserve.time;
      this.reserveInfo.place = reserve.place;
      this.reserve = reserve;
    }
  };


  changeDate() {
    this.returnGuestTimes()
    this.timeList$.subscribe((res) => {
      const filtred = res.filter((item) => {
        return item.date?.day === this.reserveModel.date.day &&
          item.date?.month === this.reserveModel.date.month &&
          item.date?.year === this.reserveModel.date.year
      })
      this.timeList$ = of(filtred)

    })
  }

  findTable(findTableForm: any) {
    if (findTableForm.invalid) {
      return
    }
    else {
      this.viewMode = 'selectTime';
      this.timeList$.subscribe((res) => {
        const filtred = res.filter((item) => {
          return item.date?.day === this.reserveModel.date.day &&
            item.date?.month === this.reserveModel.date.month &&
            item.date?.year === this.reserveModel.date.year
        })
        this.timeList$ = of(filtred)
      })
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
            marketing: this.reserveInfo.marketingConsent,
            date: this.reserveInfo.date,
            UID: res.uid
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
      this.sharedService.notificationChange.next()

    })
  };



};


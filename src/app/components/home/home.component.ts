import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { fade } from 'src/app/shared/animations';
import { ReservationComponent } from '../reservation/reservation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fade],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(public modal: MatDialog,
    private shared: SharedService) { }

  images$: Observable<string[]>


  ngOnInit(): void {
    this.returnImages();
  };


  returnImages() {
    this.images$ = this.shared.returnCarouselImages();
  };


  openReserve() {
    this.modal.open(ReservationComponent, {
      autoFocus: false,
      maxHeight: '90vh'
    })
  };



};

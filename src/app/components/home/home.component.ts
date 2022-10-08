import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from, map, Observable, of, switchMap, toArray, zip } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { fade } from 'src/app/shared/animations';
import { ReservationComponent } from '../reservation/reservation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fade]
})
export class HomeComponent implements OnInit {

  constructor(public modal: MatDialog,
    private shared: SharedService) { }

  images$: Observable<string[]>


  ngOnInit(): void {
    this.returnImages();



    
    zip(of(27, 25, 29), of('Foo', 'Bar', 'Beer'), of(true, true, 'Beer')).pipe(
      map(([age, name, isDev]) => ({ age, name, isDev })),
      toArray()

    ).subscribe((res) => {

      console.log(res)

    })


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

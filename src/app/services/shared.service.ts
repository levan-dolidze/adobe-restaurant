import { Injectable } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = true;
  };


  returnCarouselImages(): Observable<string[]> {
    return of(['https://images.squarespace-cdn.com/content/v1/525aecbfe4b0c7aebf2907bb/1426075543552-T7VES4BE76RLOH38KGSP/Druids+Glen+Restaurant+2000px-10.jpg',
      'https://images.squarespace-cdn.com/content/v1/525aecbfe4b0c7aebf2907bb/1426075529804-5XGJTZCMYSS4J2HMYRR3/Druids+Glen+Restaurant+2000px-7.jpg',
      'https://www.gordonramsayrestaurants.com/assets/Uploads/_resampled/CroppedFocusedImage160055050-50-GRBG-Sim-Shoot-2-2000px.jpg',
      'https://www.kilkennyormonde.com/upload/slide_images/savour-2000px.jpg',
      'https://images.squarespace-cdn.com/content/v1/525aecbfe4b0c7aebf2907bb/1426075543552-T7VES4BE76RLOH38KGSP/Druids+Glen+Restaurant+2000px-10.jpg'
    ])

  }

  notificationChange: Subject<void> = new Subject();

}

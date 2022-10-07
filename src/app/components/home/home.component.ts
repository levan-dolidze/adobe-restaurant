import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';
import { fade } from 'src/app/shared/animations';
import { ReservationComponent } from '../reservation/reservation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fade]
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpService,
    config: NgbCarouselConfig,
    public modal: MatDialog,


  ) {
    config.interval = 2000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  images = ['https://images.squarespace-cdn.com/content/v1/525aecbfe4b0c7aebf2907bb/1426075543552-T7VES4BE76RLOH38KGSP/Druids+Glen+Restaurant+2000px-10.jpg',
    'https://images.squarespace-cdn.com/content/v1/525aecbfe4b0c7aebf2907bb/1426075529804-5XGJTZCMYSS4J2HMYRR3/Druids+Glen+Restaurant+2000px-7.jpg',
    'https://www.gordonramsayrestaurants.com/assets/Uploads/_resampled/CroppedFocusedImage160055050-50-GRBG-Sim-Shoot-2-2000px.jpg',
    'https://www.kilkennyormonde.com/upload/slide_images/savour-2000px.jpg'
  ]

  submitForm: FormGroup;

  ngOnInit(): void {
    this.creteForm()
  }


  creteForm() {
    this.submitForm = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      array: new FormArray([])
    })
  }

  getFormControls() {
    return (<FormArray>this.submitForm.get('array')).controls
  }

  submit() {
    const newFormControl = new FormControl(null);
    (<FormArray>this.submitForm.get('array')).push(newFormControl)
  
  
  }
  openReserve() {
    this.modal.open(ReservationComponent, {
      autoFocus: false,
      maxHeight: '90vh'
    })
  };

}

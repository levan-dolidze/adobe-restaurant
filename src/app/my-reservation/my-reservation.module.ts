import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyReservationRoutingModule } from './my-reservation-routing.module';
import { MyReservationComponent } from './my-reservation.component';


@NgModule({
  declarations: [
    MyReservationComponent
  ],
  imports: [
    CommonModule,
    MyReservationRoutingModule
  ]
})
export class MyReservationModule { }

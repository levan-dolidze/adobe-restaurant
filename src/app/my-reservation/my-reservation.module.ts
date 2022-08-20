import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyReservationRoutingModule } from './my-reservation-routing.module';
import { MyReservationComponent } from './my-reservation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    MyReservationComponent
  ],
  imports: [
    CommonModule,
    MyReservationRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class MyReservationModule { }

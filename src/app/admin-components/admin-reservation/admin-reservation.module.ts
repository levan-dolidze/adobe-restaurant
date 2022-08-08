import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminReservationRoutingModule } from './admin-reservation-routing.module';
import { AdminReservationComponent } from './admin-reservation.component';


@NgModule({
  declarations: [
    AdminReservationComponent
  ],
  imports: [
    CommonModule,
    AdminReservationRoutingModule
  ]
})
export class AdminReservationModule { }

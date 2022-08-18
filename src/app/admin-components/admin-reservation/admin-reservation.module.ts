import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminReservationRoutingModule } from './admin-reservation-routing.module';
import { AdminReservationComponent } from './admin-reservation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AdminReservationComponent
  ],
  imports: [
    CommonModule,
    AdminReservationRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class AdminReservationModule { }

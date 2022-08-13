import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ReservationComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    MatDialogModule
    
  ]
})
export class ReservationModule { }

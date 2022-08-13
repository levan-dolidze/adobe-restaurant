import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { AdminEventRoutingModule } from './admin-event-routing.module';
import { AdminEventComponent } from './admin-event.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AdminEventComponent
  ],
  imports: [
    CommonModule,
    AdminEventRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class AdminEventModule { }

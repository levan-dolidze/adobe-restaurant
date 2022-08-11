import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    MatIconModule
  ]
})
export class AdminEventModule { }

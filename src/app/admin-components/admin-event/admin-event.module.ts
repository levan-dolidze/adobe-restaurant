import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEventRoutingModule } from './admin-event-routing.module';
import { AdminEventComponent } from './admin-event.component';


@NgModule({
  declarations: [
    AdminEventComponent
  ],
  imports: [
    CommonModule,
    AdminEventRoutingModule
  ]
})
export class AdminEventModule { }

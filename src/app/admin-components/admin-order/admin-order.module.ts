import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOrderRoutingModule } from './admin-order-routing.module';
import { AdminOrderComponent } from './admin-order.component';


@NgModule({
  declarations: [
    AdminOrderComponent
  ],
  imports: [
    CommonModule,
    AdminOrderRoutingModule
  ]
})
export class AdminOrderModule { }

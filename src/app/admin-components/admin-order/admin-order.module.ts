import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOrderRoutingModule } from './admin-order-routing.module';
import { AdminOrderComponent } from './admin-order.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AdminOrderComponent
  ],
  imports: [
    CommonModule,
    AdminOrderRoutingModule,
    FormsModule,
    MatButtonModule
  ]
})
export class AdminOrderModule { }

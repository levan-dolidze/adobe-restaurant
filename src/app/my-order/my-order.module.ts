import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrderRoutingModule } from './my-order-routing.module';
import { MyOrderComponent } from './my-order.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    MyOrderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MyOrderRoutingModule,
    MatProgressSpinnerModule

  ]
})
export class MyOrderModule { }

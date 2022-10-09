import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrderRoutingModule } from './admin-order-routing.module';
import { AdminOrderComponent } from './admin-order.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AdminOrderComponent
  ],
  imports: [
    CommonModule,
    AdminOrderRoutingModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class AdminOrderModule { }

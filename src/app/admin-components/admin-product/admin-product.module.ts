import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProductRoutingModule } from './admin-product-routing.module';
import { AdminProductComponent } from './admin-product.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AdminProductComponent
  ],
  imports: [
    CommonModule,
    AdminProductRoutingModule,
    FormsModule,
    MatButtonModule
  ]
})
export class AdminProductModule { }

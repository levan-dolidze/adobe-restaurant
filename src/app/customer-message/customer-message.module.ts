import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerMessageRoutingModule } from './customer-message-routing.module';
import { CustomerMessageComponent } from './customer-message.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    CustomerMessageComponent
  ],
  imports: [
    CommonModule,
    CustomerMessageRoutingModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class CustomerMessageModule { }

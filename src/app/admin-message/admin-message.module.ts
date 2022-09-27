import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMessageRoutingModule } from './admin-message-routing.module';
import { AdminMessageComponent } from './admin-message.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AdminMessageComponent
  ],
  imports: [
    CommonModule,
    AdminMessageRoutingModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class AdminMessageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReserveInputMessageRoutingModule } from './reserve-input-message-routing.module';
import { ReserveInputMessageComponent } from './reserve-input-message.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ReserveInputMessageComponent
  ],
  imports: [
    CommonModule,
    ReserveInputMessageRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ReserveInputMessageModule { }

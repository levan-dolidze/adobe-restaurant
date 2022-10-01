import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishDescriptionMessageRoutingModule } from './dish-description-message-routing.module';
import { DishDescriptionMessageComponent } from './dish-description-message.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DishDescriptionMessageComponent
  ],
  imports: [
    CommonModule,
    DishDescriptionMessageRoutingModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class DishDescriptionMessageModule { }

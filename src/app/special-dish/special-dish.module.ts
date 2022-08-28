import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialDishRoutingModule } from './special-dish-routing.module';
import { SpecialDishComponent } from './special-dish.component';


@NgModule({
  declarations: [
    SpecialDishComponent
  ],
  imports: [
    CommonModule,
    SpecialDishRoutingModule
  ]
})
export class SpecialDishModule { }

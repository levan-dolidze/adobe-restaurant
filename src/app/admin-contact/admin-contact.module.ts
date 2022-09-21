import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminContactRoutingModule } from './admin-contact-routing.module';
import { AdminContactComponent } from './admin-contact.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AdminContactComponent
  ],
  imports: [
    CommonModule,
    AdminContactRoutingModule,
    MatIconModule
  ]
})
export class AdminContactModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { AdminEventRoutingModule } from './admin-event-routing.module';
import { AdminEventComponent } from './admin-event.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminEventComponent,
    
  ],
  imports: [
    CommonModule,
    AdminEventRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    FormsModule

  ]
})
export class AdminEventModule { }

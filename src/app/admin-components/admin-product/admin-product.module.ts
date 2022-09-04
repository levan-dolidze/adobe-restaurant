import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductRoutingModule } from './admin-product-routing.module';
import { AdminProductComponent } from './admin-product.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormaterDirective } from 'src/app/directives/formater.directive';


@NgModule({
  declarations: [
    AdminProductComponent,
    FormaterDirective

  ],
  imports: [
    CommonModule,
    AdminProductRoutingModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    NgbModule,
  ]
})
export class AdminProductModule { }

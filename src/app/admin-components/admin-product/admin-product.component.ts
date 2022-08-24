import { Component, OnInit } from '@angular/core';
import { employeeModel } from 'src/app/models/employee';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  constructor() { }
  employee: employeeModel = new employeeModel()

  ngOnInit(): void {
  }
  addEmployee(form:any) {
    console.log(form)

  }
}

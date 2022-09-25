import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-message',
  templateUrl: './customer-message.component.html',
  styleUrls: ['./customer-message.component.scss']
})
export class CustomerMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: any }) { }

  ngOnInit(): void {
  }

}

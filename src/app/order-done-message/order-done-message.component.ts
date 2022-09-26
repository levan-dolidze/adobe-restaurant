import { Inject, Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-done-message',
  templateUrl: './order-done-message.component.html',
  styleUrls: ['./order-done-message.component.scss']
})
export class OrderDoneMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: any }) { }


  ngOnInit(): void {
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.scss']
})
export class AdminMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: any },
  
  ) { }

  ngOnInit(): void {
  }

}

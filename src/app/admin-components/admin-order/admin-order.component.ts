import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimemodalComponent } from 'src/app/timemodal/timemodal.component';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  constructor(private modal: MatDialog) { }

  ngOnInit(): void {
    
  };

  timeModalOpen() {
    this.modal.open(TimemodalComponent)

  };
};

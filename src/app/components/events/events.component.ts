import { Component, OnInit } from '@angular/core';
import { PrivateDiningModel } from 'src/app/models/privateDiningModel';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  privateDiningModel: PrivateDiningModel = new PrivateDiningModel();
  constructor() { }

  ngOnInit(): void {

  };

  submitPrivateEvent(form: any) {
    console.log(form)
  }
};

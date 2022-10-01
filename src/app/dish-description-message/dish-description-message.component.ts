import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from '@firebase/util';
import { DishModel } from '../models/dishModel';

@Component({
  selector: 'app-dish-description-message',
  templateUrl: './dish-description-message.component.html',
  styleUrls: ['./dish-description-message.component.scss']
})
export class DishDescriptionMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { chousenDish: any },
  ) { }
  dish: DishModel;

  ngOnInit(): void {
    console.log(this.dish.description)
  }
  




}

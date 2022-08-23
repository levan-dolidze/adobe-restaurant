import { Component, OnInit } from '@angular/core';
import { show, fade } from 'src/app/shared/animations';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
  animations:[fade,show]
})
export class StoryComponent implements OnInit {

  constructor() { }
  array:Array<number>=[1,2,3,4,5,6]

  ngOnInit(): void {
  }
  deleteNumber(i:any){
    this.array.splice(i,1)

  }

}

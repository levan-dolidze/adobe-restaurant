import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { show, fade } from 'src/app/shared/animations';
import { TeamMemberTextComponent } from 'src/app/team-member-text/team-member-text.component';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
  animations: [fade, show]
})
export class StoryComponent implements OnInit {
  membersArray: Array<any> = [
    {
      image: 'https://thumbs.dreamstime.com/b/female-restaurant-owner-digital-tablet-portrait-smiling-coffee-shop-standing-inside-her-116631151.jpg',
      name: 'mariam ',
      surname: 'sadgobelashvili',
      position: 'chief',
      description:'Lorem1 ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nulla unde modi dolorem, corrupti dolore, aspernatur consectetur vero fugit ducimus quidem, eaque tempora pariatur commodi deserunt totam consequuntur id ipsa recusandae. Voluptatum ipsum saepe exercitationem expedita! Rerum inventore magnam et aliquam laudantium, nostrum ipsam deleniti facilis consectetur quisquam modi numquam!'
    },
    {
      image: 'https://thumbs.dreamstime.com/b/female-restaurant-owner-digital-tablet-portrait-smiling-coffee-shop-standing-inside-her-116631151.jpg',
      name: 'mariam ',
      surname: 'sadgobelashvili',
      position: 'chief',
      description:'Lorem2 ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nulla unde modi dolorem, corrupti dolore, aspernatur consectetur vero fugit ducimus quidem, eaque tempora pariatur commodi deserunt totam consequuntur id ipsa recusandae. Voluptatum ipsum saepe exercitationem expedita! Rerum inventore magnam et aliquam laudantium, nostrum ipsam deleniti facilis consectetur quisquam modi numquam!'
    },
    {
      image: 'https://thumbs.dreamstime.com/b/female-restaurant-owner-digital-tablet-portrait-smiling-coffee-shop-standing-inside-her-116631151.jpg',
      name: 'mariam ',
      surname: 'sadgobelashvili',
      position: 'chief',
      description:'Lorem3 ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nulla unde modi dolorem, corrupti dolore, aspernatur consectetur vero fugit ducimus quidem, eaque tempora pariatur commodi deserunt totam consequuntur id ipsa recusandae. Voluptatum ipsum saepe exercitationem expedita! Rerum inventore magnam et aliquam laudantium, nostrum ipsam deleniti facilis consectetur quisquam modi numquam!'
    },
    {
      image: 'https://thumbs.dreamstime.com/b/female-restaurant-owner-digital-tablet-portrait-smiling-coffee-shop-standing-inside-her-116631151.jpg',
      name: 'mariam ',
      surname: 'sadgobelashvili',
      position: 'chief',
      description:'Lorem4 ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nulla unde modi dolorem, corrupti dolore, aspernatur consectetur vero fugit ducimus quidem, eaque tempora pariatur commodi deserunt totam consequuntur id ipsa recusandae. Voluptatum ipsum saepe exercitationem expedita! Rerum inventore magnam et aliquam laudantium, nostrum ipsam deleniti facilis consectetur quisquam modi numquam!'
    }

  ]
  constructor(public modal: MatDialog,) { }
  modalRef: MatDialogRef<any>
  ngOnInit(): void {
   
  }

  openEmployeeInfo(i:any) {
    this.modalRef = this.modal.open(TeamMemberTextComponent, {
      width:'30%',
      maxHeight: '90vh',
      data: { employeeArr: this.membersArray[i] },
    });
    // this.modalRef.afterClosed().subscribe((res)=>{
    //   alert('modal has closed')

    // })
  }





};

import { Inject, Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-team-member-text',
  templateUrl: './team-member-text.component.html',
  styleUrls: ['./team-member-text.component.scss'],
})

export class TeamMemberTextComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { employeeArr:any }) { }

  ngOnInit(): void {
  }

}

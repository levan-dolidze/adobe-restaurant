import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable} from 'rxjs';
import { employeeModel } from 'src/app/models/employee';
import { HttpService } from 'src/app/services/http.service';
import { show, fade } from 'src/app/shared/animations';
import { TeamMemberTextComponent } from 'src/app/team-member-text/team-member-text.component';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  animations: [fade, show]
})
export class StoryComponent implements OnInit {
  membersArray$: Observable<employeeModel[]>
  employeeList: Array<employeeModel> = [];
  employeeFotoLoaded: boolean = false;

  constructor(public modal: MatDialog, private http: HttpService) { }
  modalRef: MatDialogRef<any>
  ngOnInit(): void {
    this.returnEmployeeInfo()
  };

  returnEmployeeInfo() {
    this.membersArray$ = this.http.getEmployeeInfo();
    this.membersArray$.subscribe((res)=>{
      this.employeeList=res;
    })
    setTimeout(() => {
      this.employeeFotoLoaded = true;
    },600);
  };


  openEmployeeInfo(i: any) {
    this.modalRef = this.modal.open(TeamMemberTextComponent, {
      width: '30%',
      maxHeight: '90vh',
      data: { employeeArr: this.employeeList[i] },
    });
  };

};

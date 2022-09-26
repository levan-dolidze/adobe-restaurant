import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomerMessageModel } from '../../models/contact';
import { AdminService } from '../../services/admin.service';
import { LoaderService } from '../../services/loader.service';
import { fade } from '../../shared/animations';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.scss'],
  animations: [fade]

})
export class AdminContactComponent implements OnInit {

  constructor(private httpAdmin:AdminService,
    public loader: LoaderService,
    
    ) { }
  customerMessage$: Observable<CustomerMessageModel[]>

  ngOnInit(): void {
    this.returnCustomerMessage();
  };

  returnCustomerMessage(){
    this.customerMessage$=this.httpAdmin.getCustomerMessage();
    this.customerMessage$.subscribe((res)=>{
      this.customerMessage$=of(res)
    })
  };

  deleteMessage(key:any){
    this.httpAdmin.deleteCustomerMessage(key).subscribe(()=>{ 
      this.returnCustomerMessage()
    })
  };

}

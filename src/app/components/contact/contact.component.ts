import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerMessageComponent } from 'src/app/customer-message/customer-message.component';
import { CustomerMessageModel } from 'src/app/models/contact';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: CustomerMessageModel = new CustomerMessageModel();
  constructor(private http: HttpService,
    private dialog: MatDialog
  ) { }
  modalRef: MatDialogRef<any>

  ngOnInit(): void {
  }

  sendMessage(form: any) {
    if (form.invalid) {
      return
    } else {
      const message: CustomerMessageModel = {
        fullName: this.contact.fullName,
        email: this.contact.email,
        phoneNumber: this.contact.phoneNumber,
        message: this.contact.message
      }

      this.http.addCustomerMessage(message).subscribe((res) => {
    this.modalRef = this.dialog.open(CustomerMessageComponent, {
          width: '300px',
          maxHeight: '90vh',
          data: { name: this.contact },

        }
        )
      })
    };
  };
};

import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { employeeModel } from 'src/app/models/employee';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpService } from 'src/app/services/http.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  constructor(private storage: AngularFireStorage,
    private httpAdmin: AdminService
  ) { }
  employee: employeeModel = new employeeModel();
  imgURL: any;
  selectedImage: any

  ngOnInit(): void {
    this.httpAdmin.getImageDetailList()

  };
  addEmployee(form: any) {
    if (form.invalid) {
      return
    } else {
      //მოგვაქვს ფაილის სახელი , რომ არ დადუბლირდეს ფაილის სახელი დროს ვუთითებთ
      var filePath = `${this.selectedImage.name}_${new Date().getTime()}`
      const fileRef = this.storage.ref(filePath)
      
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          //url ში გვაქვს ახალი ატვირთული სურათი
          fileRef.getDownloadURL().subscribe((url) => {
            this.imgURL = url;
            const obj = {
              name: this.employee.name,
              surname: this.employee.surname,
              position: this.employee.position,
              description: this.employee.description,
              image: this.imgURL

            }
            this.httpAdmin.insertImageDetails(obj)
          })

        })
      ).subscribe(() => { })
    }

  };



  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgURL = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage = event.target.files[0];
      console.log(this.selectedImage)
      console.log(this.imgURL)
    } else {
      this.imgURL = 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';
      this.selectedImage = null;
    }

  };

};

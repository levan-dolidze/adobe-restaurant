import { Component, OnInit } from '@angular/core';
import { finalize, Observable, of } from 'rxjs';
import { employeeModel } from 'src/app/models/employee';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AdminService } from 'src/app/services/admin.service';
import { fade, menu } from 'src/app/shared/animations';
import { HttpService } from 'src/app/services/http.service';
import { Menu } from 'src/app/models/menu';
import { DateRestriction, GuestTime } from 'src/app/models/reserve';
import { DishModel } from 'src/app/models/dishModel';
import { Service } from 'src/app/models/shared';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminMessageComponent } from 'src/app/admin-message/admin-message.component';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
  animations: [menu, fade]
})
export class AdminProductComponent implements OnInit {

  constructor(private storage: AngularFireStorage,
    private httpAdmin: AdminService,
    private http: HttpService,
    private dialog: MatDialog,
    

  ) { }
  employee: employeeModel = new employeeModel();
  dish: DishModel = new DishModel();
  menu: Menu = new Menu();
  imgURL: unknown;
  menuURL: unknown
  dishURL: unknown;
  selectedImage: unknown;
  selectedMenu: unknown;
  selectedDish: unknown;
  

  viewMode: string = 'form'
  employeeList$: Observable<employeeModel[]>;
  dishList$: Observable<DishModel[]>;
  currentDate = new DateRestriction();


  guestTime: GuestTime = new GuestTime();
  guestTimes: Array<GuestTime> = [];

  modalRef: MatDialogRef<any>

  ngOnInit(): void {
    this.httpAdmin.getImageDetailList();
    this.httpAdmin.getMenuList();
    this.httpAdmin.getDishList();
    this.returnEmployees();
    this.returnDishList();
  };


  returnEmployees() {
    this.employeeList$ = this.http.getEmployeeInfo();
    this.employeeList$.subscribe((res) => {
      this.employeeList$ = of(res)
    })
  };

  returnDishList() {
    this.dishList$ = this.http.getDishList();
    this.dishList$.subscribe((res) => {
      this.selectedDish = of(res)
    })
  };

  addEmployee(form: any) {
    if (form.invalid) {
      return
    } else {
      localStorage.setItem('service', 'employee')
      this.addFile(this.selectedImage, {
        name: this.employee.name,
        surname: this.employee.surname,
        position: this.employee.position,
        description: this.employee.description,
      })

      this.modalRef = this.dialog.open(AdminMessageComponent, {
        width: '300px',
        maxHeight: '90vh',
        data: { event: this.employee.name },
      });

    };
  };

  deleteEmployee(key: any) {
    this.http.deleteEmployee(key).subscribe(() => {
      this.returnEmployees();
    })
  };
  deleteDishList(key: any) {
    this.http.deleteDish(key).subscribe((res) => {
      this.returnDishList()
    })
  };

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgURL = e.target.result;
      reader.onload = (e: any) => this.menuURL = e.target.result;
      reader.onload = (e: any) => this.dishURL = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage = event.target.files[0];
      this.selectedMenu = event.target.files[0];
      this.selectedDish = event.target.files[0];
    } else {
      this.imgURL = 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';
      this.selectedImage = null;
      this.selectedMenu = null;
      this.selectedDish = null;
    }
  };


  addMenu(form: any) {
    if (form.invalid) {
      return
    } else {
      localStorage.setItem('service', 'menu')
      this.addFile(this.selectedMenu, { name: this.menu.name.toLocaleUpperCase()})
      this.modalRef = this.dialog.open(AdminMessageComponent, {
        width: '300px',
        maxHeight: '90vh',
        data: { event: this.menu.name },
      });
    };
  };


  addFile(selectedFile: any, obj: any) {
    var filePath = `${selectedFile.name}_${new Date().getTime()}`
    const fileRef = this.storage.ref(filePath)
    this.storage.upload(filePath, selectedFile).snapshotChanges().pipe(
      finalize(() => {
        //url ში გვაქვს ახალი ატვირთული სურათი
        let service = localStorage.getItem('service');
        fileRef.getDownloadURL().subscribe((url) => {
          if (url) {
            obj.file = url
            switch (service) {
              case Service.menu:
                this.httpAdmin.insertMenu(obj)
                break;
              case Service.employee:
                this.httpAdmin.insertImageDetails(obj)
                break;
              case Service.dish:
                this.httpAdmin.insertDish(obj)
                break;
              default:
                break;
            }
          }
        })
      })
    ).subscribe(() => { })
  };


  addTime(form: any) {
    if (form.invalid) {
      return
    } else {
      const time: GuestTime = {
        time: this.guestTime.time,
        place: this.guestTime.place,
        status: true,
        date: this.guestTime.date
      }
      this.httpAdmin.addGuestTime(time).subscribe((res) => {
        this.modalRef = this.dialog.open(AdminMessageComponent, {
          width: '300px',
          maxHeight: '90vh',
          data: { event: this.guestTime.time},
        });
      })
    }
  };


  addDish(form: any) {
    if (form.invalid) {
      return
    } else {
      localStorage.setItem('service', 'dish')
      this.addFile(this.selectedDish, {
        name: this.dish.name,
        category: this.dish.category,
        price: this.dish.price,
        inCart:this.dish.inCart,
        description:this.dish.description
      })
      this.modalRef = this.dialog.open(AdminMessageComponent, {
        width: '300px',
        maxHeight: '90vh',
        data: { event: this.dish.name},
      });

    }
  };




};

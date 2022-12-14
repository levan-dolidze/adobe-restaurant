import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { finalize, Observable, of } from 'rxjs';
import { employeeModel } from 'src/app/models/employee';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AdminService } from 'src/app/services/admin.service';
import { fade, menu } from 'src/app/shared/animations';
import { HttpService } from 'src/app/services/http.service';
import { Menu } from 'src/app/models/menu';
import { DateRestriction, GuestTime, ReserveModel } from 'src/app/models/reserve';
import { DishModel } from 'src/app/models/dishModel';
import { AdminList, Service } from 'src/app/models/shared';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminMessageComponent } from 'src/app/admin-message/admin-message.component';
import { ReserveInputMessageComponent } from 'src/app/reserve-input-message/reserve-input-message.component';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
  animations: [menu, fade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminProductComponent implements OnInit {

  constructor(private storage: AngularFireStorage,
    private httpAdmin: AdminService,
    private http: HttpService,
    private dialog: MatDialog,
    private router: Router
  ) {

  }
  employee: employeeModel = new employeeModel();
  dish: DishModel = new DishModel();
  menu: Menu = new Menu();
  imgURL: unknown;
  menuURL: unknown
  dishURL: unknown;
  selectedImage: unknown;
  selectedMenu: unknown;
  selectedDish: unknown;

  adminList = AdminList;
  viewMode: string;


  employeeList$: Observable<employeeModel[]>;
  dishList$: Observable<DishModel[]>;
  menuList$: Observable<Menu[]>;
  timeList$: Observable<GuestTime[]>;
  currentDate = new DateRestriction();


  guestTime: GuestTime = new GuestTime();
  guestTimes: Array<GuestTime> = [];
  modalRef: MatDialogRef<unknown>;
  reserveModel: ReserveModel = new ReserveModel();


  ngOnInit(): void {
    this.adminModeControl();
    this.routerChanged()
    this.httpAdmin.getImageDetailList();
    this.httpAdmin.getMenuList();
    this.httpAdmin.getDishList();
    this.returnEmployees();
    this.returnDishList();
    this.returnMenus();
    this.returnTimes();

    const d = new Date();
    this.reserveModel.date = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() }
  };

  routerChanged() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.viewMode = this.adminList.employeeForm;
        sessionStorage.setItem('adminMode', this.viewMode);
      };
    })
  };


  adminModeControl() {
    let adminMode = sessionStorage.getItem('adminMode');
    adminMode ? this.viewMode = adminMode : this.viewMode = this.adminList.employeeForm;
  };

  returnTimes() {
    this.timeList$ = this.http.getGuestTime();
    this.timeList$.subscribe((res) => {
      const filtred = res.filter((item) => {
        return item.date?.day === this.reserveModel.date.day &&
          item.date?.month === this.reserveModel.date.month &&
          item.date?.year === this.reserveModel.date.year
      })
      this.timeList$ = of(filtred)
    })
  };


  changeDate() {
    this.returnTimes();
    this.timeList$.subscribe((res) => {
      const filtred = res.filter((item) => {
        return item.date?.day === this.reserveModel.date.day &&
          item.date?.month === this.reserveModel.date.month &&
          item.date?.year === this.reserveModel.date.year
      })
      this.timeList$ = of(filtred)
    })
  };


  returnMenus() {
    this.menuList$ = this.http.getMenu();
  };

  deleteMenu(key: any) {
    this.http.deleteMenu(key).subscribe((res) => {
      this.returnMenus();
    })
  };

  returnEmployees() {
    this.employeeList$ = this.http.getEmployeeInfo();
  };

  returnDishList() {
    this.dishList$ = this.http.getDishList();
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
      this.addFile(this.selectedMenu, { name: this.menu.name.toLocaleUpperCase() })
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
        //url ?????? ?????????????????? ??????????????? ??????????????????????????? ??????????????????
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
          data: { event: this.guestTime.time },
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
        inCart: this.dish.inCart,
        description: this.dish.description
      })
      this.modalRef = this.dialog.open(AdminMessageComponent, {
        width: '300px',
        maxHeight: '90vh',
        data: { event: this.dish.name },
      });

    }
  };

  startReserve(time: any) {
    if (time.status === false) {
      return
    } else {
      this.modalRef = this.dialog.open(ReserveInputMessageComponent, {
        width: '300px',
        maxHeight: '90vh',
        data: { reserveDate: time },
      });
    }
  };

  //admin mode controls
  menuView() {
    this.viewMode = this.adminList.menuForm;
    sessionStorage.setItem('adminMode', this.viewMode)
  };

  employeeView() {
    this.viewMode = this.adminList.employeeForm;
    sessionStorage.setItem('adminMode', this.viewMode);
  };
  timeView() {
    this.viewMode = this.adminList.timeForm;
    sessionStorage.setItem('adminMode', this.viewMode);
  };

  dishView() {
    this.viewMode = this.adminList.dishForm;
    sessionStorage.setItem('adminMode', this.viewMode);
  };


};

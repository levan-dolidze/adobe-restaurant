import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable, of, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PrivateDiningModel } from '../models/privateDiningModel';
import { GuestTime, TableReservationModel } from '../models/reserve';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'
import { OrderModel } from '../models/order';
import { CustomerMessageModel } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  readonly apiUrl = environment.apiURL;
  //privatze unda gadavaketo tu ar gaaerorebs
  constructor(public firebaseAuth: AngularFireAuth,
    private http: HttpClient,
    private firebase: AngularFireDatabase
  ) { }

  privateDinning: PrivateDiningModel[] = [];
  guestTime: GuestTime[] = [];
  tableReservations: TableReservationModel[] = [];

  orderedDiningDelete$: Subject<any> = new Subject();
  tableReservationDetele$: Subject<any> = new Subject();


  imageDetailList: AngularFireList<any>
  menuList: AngularFireList<any>;
  dishList: AngularFireList<any>;
  notification: Subject<any> = new Subject();


  returnPrivateDining(): Observable<PrivateDiningModel[]> {
    return this.http.get<PrivateDiningModel[]>(`${this.apiUrl}privateEvent.json`).pipe(
      map((res) => {
        if (res) {
          const arr = [];
          for (const key in res) {
            arr.push({ ...res[key], ke: key })
          }
          this.privateDinning = arr
          return arr
        }
        else {
          return [];
        }
      })
    )
  };

  deleteOrderedDiningEvent(key: any) {
    return this.http.delete(`${this.apiUrl}privateEvent/${key}.json`).pipe(
      tap(() => {
        const index = this.privateDinning.map((item) => item.key).indexOf(key);
        this.privateDinning.splice(index, 1)
        this.orderedDiningDelete$.next(of(this.privateDinning))
      })
    )
  };

  //time add

  addGuestTime(time: GuestTime) {
    return this.http.post(`${this.apiUrl}guestTime.json`, time)
  };


  //get all reservations

  getTableReservations(): Observable<TableReservationModel[]> {
    return this.http.get<TableReservationModel[]>(`${this.apiUrl}completeReservations.json`).pipe(
      map((res) => {
        if (res) {
          const array = [];
          for (const key in res) {
            array.push({ ...res[key], deleteKey: key })
          }
          this.tableReservations = array
          return array
        }
        return []
      })
    )
  };


  //delete Reservation, it also would be fit for cancelation of table reservation

  deleteTableReservation(key: any) {
    //es key ar aris romelic shecvlis statuss
    return this.http.delete(`${this.apiUrl}completeReservations/${key}.json`).pipe(
      tap(() => {
        const index = this.tableReservations.map((item) => item.key).indexOf(key);
        this.tableReservations.splice(index, 1)
        this.tableReservationDetele$.next(of(this.tableReservations))
      })
    )
  };


  cancelTableTime(key: any) {
    return this.http.patch(`${this.apiUrl}guestTime/${key}.json`, { status: true }).pipe(
      // tap(()=>{
      //   const index =this.guestTime.map((item)=>item.key).indexOf(reserveTime.key)
      //   this.guestTime[index]=reserveTime
      // })
    )
  };


  //add new employee

  insertImageDetails(imageDetails: any) {
    this.imageDetailList.push(imageDetails)
  }
  getImageDetailList() {
    this.imageDetailList = this.firebase.list('employees')
  };


  insertMenu(imageDetails: any) {
    this.menuList.push(imageDetails)
  }
  getMenuList() {
    this.menuList = this.firebase.list('menu')
  };

  insertDish(dishDetails: any) {
    this.dishList.push(dishDetails)
  }
  getDishList() {
    this.dishList = this.firebase.list('dish');
  };



  //return online order

  getOnlineOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(`${this.apiUrl}onlineDishOrder.json`).pipe(
      map((res) => {
        if (res) {
          const array = [];
          for (const key in res) {
            array.push({ ...res[key], key: key })
          }
          return array
        }
        else {
          return []
        }
      })
    )
  };

  //online order delete
  deleteOrder(key: any) {
    return this.http.delete(`${this.apiUrl}onlineDishOrder/${key}.json`)
  };


  // get customer message

  getCustomerMessage(): Observable<CustomerMessageModel[]> {
    return this.http.get<CustomerMessageModel[]>(`${this.apiUrl}customerMessage.json`).pipe(
      map((res) => {
        if (res) {
          const array = [];
          for (const key in res) {
            array.push({ ...res[key], key: key })
          }
          return array
        } else {
          return []
        }

      })
    )
  }

  deleteCustomerMessage(key: any) {
    return this.http.delete(`${this.apiUrl}customerMessage/${key}.json`)
  };

};

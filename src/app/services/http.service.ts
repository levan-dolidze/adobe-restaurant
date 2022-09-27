import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerMessageModel } from '../models/contact';
import { DishModel } from '../models/dishModel';
import { employeeModel } from '../models/employee';
import { Menu } from '../models/menu';
import { OrderModel } from '../models/order';
import { EventTypeModel, PrivateDiningModel } from '../models/privateDiningModel';
import { GuestTime, TableReservationModel } from '../models/reserve';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly apiUrl = environment.apiURL;
  constructor(private http: HttpClient) { }

  guestTime: GuestTime[] = [];
  myReservations: TableReservationModel[] = [];
  cartChanges: Subject<any> = new Subject();


  


  addPrivateEvent(event: PrivateDiningModel): Observable<PrivateDiningModel> {
    return this.http.post<PrivateDiningModel>(`${this.apiUrl}privateEvent.json`, event)
  };


  //guest time
  getGuestTime(): Observable<GuestTime[]> {
    return this.http.get<GuestTime[]>(`${this.apiUrl}guestTime.json`).pipe(
      map((res) => {
        if (res) {
          const times = [];
          for (const key in res) {
            times.push({ ...res[key], key: key })
          }
          this.guestTime = times
          return this.guestTime;
        }
        return [];
      })
    )
  };


  bookingTable(reserveTime: GuestTime) {
    return this.http.patch(`${this.apiUrl}guestTime/${reserveTime.key}.json`, { status: false }).pipe(
      // tap(()=>{
      //   const index =this.guestTime.map((item)=>item.key).indexOf(reserveTime.key)
      //   this.guestTime[index]=reserveTime
      // })
    )
  };


  completeReservation(reservation: any) {
    return this.http.post(`${this.apiUrl}completeReservations.json`, reservation)
  };


  // get my reservations

  getMyReservations(): Observable<TableReservationModel[]> {
    return this.http.get<TableReservationModel[]>(`${this.apiUrl}completeReservations.json`).pipe(
      map((res) => {
        if (res) {
          const arr = [];
          for (const key in res) {
            arr.push({ ...res[key], deleteKey: key })
          }
          this.myReservations = arr
          return this.myReservations;
        } else {
          return [];
        }
      })
    )

  }


  deleteMyTableReservation(key: any) {
    return this.http.delete(`${this.apiUrl}completeReservations/${key}.json`)
  };


  //add new event type

  addEventType(eventType: EventTypeModel): Observable<EventTypeModel> {
    return this.http.post<EventTypeModel>(`${this.apiUrl}eventTypes.json`, eventType)
  };

  getEventTypes(): Observable<EventTypeModel[]> {
    return this.http.get<EventTypeModel[]>(`${this.apiUrl}eventTypes.json`).pipe(
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

  getEmployeeInfo(): Observable<employeeModel[]> {
    return this.http.get<employeeModel[]>(`${this.apiUrl}employees.json`).pipe(
      map((res) => {
        if (res) {
          const array = [];
          for (const key in res) {
            array.push({ ...res[key], key: key })
          }
          return array
        }
        else {
          return [];
        }
      })
    )
  };

  deleteEmployee(key: any) {
    return this.http.delete(`${this.apiUrl}employees/${key}.json`)
  };

  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}menu.json`).pipe(
      map((res) => {
        if (res) {
          const arr = [];
          for (const key in res) {
            arr.push({ ...res[key], key: key })

          }
          return arr
        }
        else {
          return []
        }
      })
    )
  };

  getDishList(): Observable<DishModel[]> {
    return this.http.get<DishModel[]>(`${this.apiUrl}dish.json`).pipe(
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





  deleteDish(key: any) {
    return this.http.delete(`${this.apiUrl}dish/${key}.json`)
  };


  //add dish order

  addNewDishOrder(newOrder: OrderModel) {
    return this.http.post(`${this.apiUrl}onlineDishOrder.json`, newOrder)
  };


  //add customer message
  addCustomerMessage(message: CustomerMessageModel) {
    return this.http.post(`${this.apiUrl}customerMessage.json`, message)
  };


};

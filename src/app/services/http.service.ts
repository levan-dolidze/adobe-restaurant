import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PrivateDiningModel } from '../models/privateDiningModel';
import { GuestTime } from '../models/reserve';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly apiUrl = environment.apiURL;
  constructor(private http: HttpClient) { }

  guestTime: GuestTime[] = [];


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
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable, of, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PrivateDiningModel } from '../models/privateDiningModel';
import { GuestTime } from '../models/reserve';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 readonly apiUrl = environment.apiURL;
  //privatze unda gadavaketo tu ar gaaerorebs
  constructor(public firebaseAuth: AngularFireAuth,
    private http: HttpClient) { }
  privateDinning: PrivateDiningModel[] = [];

  guestTime: GuestTime[] = [];

  orderedDiningDelete$: Subject<any> = new Subject()


  returnPrivateDining(): Observable<PrivateDiningModel[]> {
    return this.http.get<PrivateDiningModel[]>(`${this.apiUrl}privateEvent.json`).pipe(
      map((res) => {
        if (res) {
          const arr = [];
          for (const key in res) {
            arr.push({ ...res[key], key: key })
          }
          this.privateDinning = arr
          return arr
        }
        else {
          return [];
        }
      })
    )
  }

  deleteOrderedDiningEvent(key: any) {
    return this.http.delete(`${this.apiUrl}privateEvent/${key}.json`).pipe(
      tap(() => {
        const index = this.privateDinning.map((item) => item.key).indexOf(key);
        this.privateDinning.splice(index, 1)
        this.orderedDiningDelete$.next(of(this.privateDinning))
      })
    )
  }

  //time add

  addGuestTime(time: GuestTime) {
    return this.http.post(`${this.apiUrl}guestTime.json`, time)
  };


};

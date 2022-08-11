import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PrivateDiningModel } from '../models/privateDiningModel';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = environment.apiURL;
  constructor(private http: HttpClient) { }



  addPrivateEvent(event: PrivateDiningModel): Observable<PrivateDiningModel> {
    return this.http.post<PrivateDiningModel>(`${this.apiUrl}privateEvent.json`, event)
  };

  



}

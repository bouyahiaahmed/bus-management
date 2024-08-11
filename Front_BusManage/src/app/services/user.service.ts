import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Add this line
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

    addUser(user: any):Observable<any> {
     return this._http.post<any>('http://localhost:8080/user/add', user)
    }
}

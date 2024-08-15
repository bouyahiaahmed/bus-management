import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/user';

  login(user: any) {
    return this._http.post<any>(`${this.apiUrl}/login`, user)
  }
  
}

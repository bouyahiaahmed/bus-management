import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Add this line
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/user';

  getUsers(): Observable<any[]> {
    return this._http.get<any[]>('http://localhost:8080/user/list');
  }

  getUserById(id: string): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateUser(user: any) {
    return this._http.put<any>(`${this.apiUrl}/update/${user.id}`, user);
  }
    addUser(user: any):Observable<any> {
     return this._http.post<any>(`${this.apiUrl}/add`, user)
    }
    deleteUser(id: string): Observable<any> {
      return this._http.delete<any>(`${this.apiUrl}/delete/${id}`);
    }
    
}

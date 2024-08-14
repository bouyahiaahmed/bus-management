import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Add this line
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/user';
  private emailApiUrl = 'http://localhost:8080/email';

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
    assigncred(user: any) {
      return this._http.put<any>(`${this.apiUrl}/assign-credentials/${user.id}`, user);
    } 
    sendEmail(to: string, subject: string, text: string): Observable<string> {
      const params = new HttpParams()
        .set('to', to)
        .set('subject', subject)
        .set('text', text);
    
      return this._http.get<string>('http://localhost:8080/email/send', { params, responseType: 'text' as 'json' });
    }

    
}

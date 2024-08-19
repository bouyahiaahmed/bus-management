import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Add this line
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { 
          // Assuming you store user info in localStorage after login
          const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
          if (storedUser) {
            this.userSubject.next(storedUser);
          }
  }
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
    getUsersByRole(role: string): Observable<any[]> {
      return this._http.get<any[]>(`${this.apiUrl}/by-role/${role}`);
    }

    private userSubject = new BehaviorSubject<User | null>(null);
    currentUser = this.userSubject.asObservable();
  
    
    setUser(user: User) {
      this.userSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  
    getCurrentUser(): User | null {
      return this.userSubject.value;
    }
  }

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private _http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/bus';

  getBuses(): Observable<any[]> {
    return this._http.get<any[]>(`${this.apiUrl}/list`);
  }
  updateBus(bus: any) {
    return this._http.put<any>(`${this.apiUrl}/update/${bus.id}`, bus);
  }
    addBus(bus: any):Observable<any> {
     return this._http.post<any>(`${this.apiUrl}/addbus`, bus)
    }
    deleteBus(id: string): Observable<any> {
      return this._http.delete<any>(`${this.apiUrl}/delete/${id}`);
    }
    assignBus(busId: string, driverId: string, startingDestination: string, departureDate: string, departureTime: string): Observable<string> {
      // Encode parameters to handle special characters
      const encodedDestination = encodeURIComponent(startingDestination);
      const encodedDate = encodeURIComponent(departureDate);
      const encodedTime = encodeURIComponent(departureTime);
      
      // Construct the URL with encoded parameters
      const url = `${this.apiUrl}/assign-driver/${busId}/${driverId}/${encodedDestination}/${encodedDate}/${encodedTime}`;
    
      // Specify that the response should be treated as plain text
      return this._http.put<string>(url, null, { responseType: 'text' as 'json' });
    }
    reserveSeat(busId: string, user: User): Observable<string> {
      return this._http.post<string>(`http://localhost:8080/bus/${busId}/reserve`, user, { responseType: 'text' as 'json' });
    }

}

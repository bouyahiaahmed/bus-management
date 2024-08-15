import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    assignBus(busId: string, driverId: string, startingDestination: string): Observable<string> {
      // Encode the startingDestination to handle special characters
      const encodedDestination = encodeURIComponent(startingDestination);
      
      // Specify that the response should be treated as plain text
      return this._http.put<string>(
        `${this.apiUrl}/assign-driver/${busId}/${driverId}/${encodedDestination}`, 
        null, 
        { responseType: 'text' as 'json' }
      );
    }
    


}

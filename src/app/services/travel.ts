import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Travel {
  private apiUrl = 'http://localhost:3000/api/travel';
  constructor(private http: HttpClient) {}

  saveTravel(data: any): Observable<any> {
    console.log('data reached service file');
    return this.http.post(this.apiUrl, data);
  }

  getAllTravels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTravelByid(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateTravel(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteTravel(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

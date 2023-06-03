import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = '';

  constructor(private http: HttpClient) { }

  get(path: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${path}`);
  }

  post(path: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${path}`, data);
  }

  put(path: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${path}`, data);
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${path}`);
  }
}

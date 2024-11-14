import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://localhost:3001/logs'; 
  constructor(private http: HttpClient) {}

  logLoginAttempt(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>('/api/clients');
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`/api/clients/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>('/api/clients', data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`/api/clients/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`/api/clients/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService<T> {
  apiUrl: string;
  http: HttpClient;

  constructor(apiUrl :string, http: HttpClient) {
    this.apiUrl = apiUrl;
    this.http = http;
  }
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`https://localhost:3000/api/${this.apiUrl}`);
  }
  getById(id :string): Observable<T> {
    return this.http.get<T>(`https://localhost:3000/api/${this.apiUrl}/${id}`);
  }
  add(data : T) {
    return this.http.post(`https://localhost:3000/api/${this.apiUrl}/`, data);
  }
  deleteById(id : string) {
    return this.http.delete(`https://localhost:3000/api/${this.apiUrl}/${id}`);
  }
  updateById(data: T & {id : string}) {
    return this.http.put(`https://localhost:3000/api/${this.apiUrl}/${data.id}`, data);
  }
}


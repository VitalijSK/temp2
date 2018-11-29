import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../../interfaces/user';
import { Observable, throwError } from 'rxjs';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends MainService<IUser> {
  constructor(public http: HttpClient) { 
    super('users', http);
  }
  getPassword(name: string): Observable<string> {
    const data = { checkName: name };
    return this.http.post<string>('https://localhost:3000/api/users/getPassword', data);
  }
  getCurrectName(name: string): Observable<Boolean> {
    const data = { checkName: name };
    return this.http.post<Boolean>('https://localhost:3000/api/users/checkName', data);
  }
  Auth(name: string, password: string): Observable<{ token: string }> {
    const data = { name, password };
    return this.http.post<{ token: string }>('https://localhost:3000/api/users/checkUser', data);
  }
  CheckUserAuth(): Observable<boolean> {
    const src: string = 'https://localhost:3000/api/users/checkAuthUser';
    return this.checkAuth<boolean>(src);
  }
  checkAuth<T>(src: string): Observable<T> {
    const token = localStorage.getItem('token');
    if (token) {
      const header = {
        headers: new HttpHeaders({
          'x-access-token': token
        })
      };
      return this.http.get<T>(src, header);
    } else {
      return throwError('User is not found');
    }
  }
  getMyProfile(): Observable<IUser> {
    const src: string = 'https://localhost:3000/api/users/profile/';
    return this.checkAuth<IUser>(src);
  }
}


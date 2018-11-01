import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import IUser from '../../interfaces/user';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  getUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>('https://localhost:3000/api/users');
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
  updateUser(user: IUser) {
    const data = user;
    return this.http.put(`https://localhost:3000/api/users/${user.id}`, data);
  }
  getMyProfile(): Observable<IUser> {
    const src: string = 'https://localhost:3000/api/profile';
    return this.checkAuth<IUser>(src);
  }
}


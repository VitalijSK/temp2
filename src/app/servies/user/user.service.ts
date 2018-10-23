import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IUser from '../../interfaces/user';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService  {
    httpOptions : { headers: HttpHeaders } = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    }; ;
  constructor(private http: HttpClient) { }
  getUsers() : Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>('https://localhost:3000/api/users');
  }
  getPassword (name : string) : Observable<string> {
    const data  = { checkName: name };
    return this.http.post<string>('https://localhost:3000/api/users/getPassword', data, this.httpOptions);
  }
  getCurrectName (name: string) : Observable<Boolean> {
    const data  = { checkName: name };
    return this.http.post<Boolean>('https://localhost:3000/api/users/checkName', data, this.httpOptions);
  }
  Auth (name: string, password: string) : Observable<{token: string}> {
    const data  = { name, password};
    return this.http.post<{token: string}>('https://localhost:3000/api/users/checkUser', data, this.httpOptions);
  }
  getMyProfile () {
    const token = localStorage.getItem('token'); 
    if (token) {
        const header = {
            headers: new HttpHeaders({
              'x-access-token':  token
            })
        };  
        return this.http.get<Array<IUser>>('https://localhost:3000/api/profile', header);
    } else {
        return Observable.throw('Can\'t access');
    }
  }
}


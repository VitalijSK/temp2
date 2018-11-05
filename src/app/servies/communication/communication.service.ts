import { Injectable } from '@angular/core';
import { Subject, Observable, of, throwError, BehaviorSubject } from 'rxjs';
import IUser from 'src/app/interfaces/user';
import { UserService } from '../user/user.service';
import { map, catchError } from 'rxjs/operators';
import moment = require('moment');
import settings from 'src/app/form-add/settings';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  user: IUser = {
    name: '',
    password: '',
    age: 0
  }
  getInfoUser: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(this.user);
  user$: Observable<IUser> = this.getInfoUser.asObservable();

  constructor(private userService: UserService) {
    window.addEventListener('storage', (event) => {
      if (event.key === 'update') {
        this.getCorrectInfo();
      }
    });
  }

  getCorrectInfo() {
    this.userService.getMyProfile().pipe(
      map(user => {
        user.dateOfBirth = moment(user.dateOfBirth).format(settings.birthday.format);
        user.dateOfFirstLogin = moment(user.dateOfFirstLogin).format(settings.dateOfLogin.format);
        user.dateOfNextNotification = moment(user.dateOfNextNotification).format(settings.dateOfNotification.format);
        this.getInfoUser.next(user);
      }),
      catchError(err => {
        const error: IUser = {
          name: '',
          age: 0,
          password: '',
          error: err
        }
        this.getInfoUser.next(error)
        return of();
      })
    ).subscribe();
  }
}

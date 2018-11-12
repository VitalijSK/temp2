import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable, combineLatest, of } from 'rxjs';
import { map, catchError, filter, mergeMap, tap } from 'rxjs/operators';
import moment = require('moment');
import {
  LOAD_USER,
  LoadUserSuccess,
  LoadUserFail,
  AuthUserFail,
  LogoutUserSuccess,
  AUTH_USER,
  LOGOUT_USER,
  LOAD_USERS,
  LoadUsersSuccess,
  EDIT_USER,
  ADD_USER,
  SETTING_USER,
  DELETE_USER
} from '../actions/user';
import { UserService } from '../../servies/user/user.service';
import settings from 'src/app/form-add/settings';
import { IDataAuth } from 'src/app/interfaces/dataAuth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import IUser from 'src/app/interfaces/user';
import { IAuth } from 'src/app/interfaces/autorization';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private translate: TranslateService,
    private router: Router
  ) { }

  @Effect()
  deleteUser$ = this.actions$.ofType(DELETE_USER).pipe(
    mergeMap((data: Action & { id: string }) => this.userService.deleteUserById(data.id)),
    mergeMap(() => this.userService.getUsers()),
    map(users => {
      users.forEach(user => {
        this.transformDate(user);
      })
      return new LoadUsersSuccess(users);
    }),
    catchError(error => {
      return of(new LoadUserFail());
    })
  );
  
  @Effect()
  addUser$ = this.actions$.ofType(ADD_USER).pipe(
    mergeMap((data: Action & { user : IUser }) => this.userService.addUser(data.user)),
    mergeMap(_ => this.translate.get('User was added!')),
    tap((message: string) => {
      Swal(message);
    }),
    mergeMap(() => this.userService.getUsers()),
    map(users => {
      users.forEach(user => {
        this.transformDate(user);
      })
      return new LoadUsersSuccess(users);
    }),
    catchError(err => {
      const header$: Observable<string> = this.translate.get('Oops...');
      const text$: Observable<string> = this.translate.get(err.error.text);
      const combined = combineLatest(header$, text$);
      combined.subscribe(
        ([header, text]) => {
          Swal(header, text, 'error');
        });
      return of(new LoadUserFail());
    })
  );

  @Effect()
  loadUser$ = this.actions$.ofType(LOAD_USER).pipe(
    mergeMap(() => this.userService.getMyProfile()),
    map(user => {
      if (user) {
        this.transformDate(user);
        return new LoadUserSuccess(user);
      }
      localStorage.setItem('token', undefined);
      this.router.navigate(['/singin']);
      return new LoadUserFail();
    }),
    catchError(error => {
      localStorage.setItem('token', undefined);
      this.router.navigate(['/singin']);
      return of(new LoadUserFail());
    })
  );

  @Effect()
  settingsUser$ = this.actions$.ofType(SETTING_USER).pipe(
    mergeMap((data: Action & { user: IUser }) => this.userService.updateUser(data.user)),
    mergeMap(_ => this.translate.get('Your information was updated!')),
    tap((message: string) => {
      Swal(message);
    }),
    mergeMap(() => this.userService.getMyProfile()),
    map((user: IUser) => {
      localStorage.removeItem('update');
      localStorage.setItem('update', null);
      this.transformDate(user);
      return new LoadUserSuccess(user);
    }),
    catchError(err => {
      const header$: Observable<string> = this.translate.get('Oops...');
      const text$: Observable<string> = this.translate.get(err.error.text);
      const combined = combineLatest(header$, text$);
      combined.subscribe(
        ([header, text]) => {
          Swal(header, text, 'error');
        });
      return of(new LoadUserFail());
    })
  );

  @Effect()
  editUser$ = this.actions$.ofType(EDIT_USER).pipe(
    mergeMap((data: Action & { user: IUser }) => {
      return this.userService.updateUser(data.user);
    }),
    mergeMap(_ => this.translate.get('Your information was updated!')),
    tap((message: string) => {
      Swal(message);
    }),
    mergeMap(() => this.userService.getUsers()),
    map(users => {
      users.forEach(user => {
        this.transformDate(user);
      })
      return new LoadUsersSuccess(users);
    }),
    catchError(err => {
      const header$: Observable<string> = this.translate.get('Oops...');
      const text$: Observable<string> = this.translate.get(err.error.text);
      const combined = combineLatest(header$, text$);
      combined.subscribe(
        ([header, text]) => {
          Swal(header, text, 'error');
        });
      return of();
    })
  );

  @Effect()
  loadUsers$ = this.actions$.ofType(LOAD_USERS).pipe(
    mergeMap(() => this.userService.getUsers()),
    map(users => {
      users.forEach(user => {
        this.transformDate(user);
      })
      return new LoadUsersSuccess(users);
    }),
    catchError(error => {
      return of(new LoadUserFail());
    })
  );

  @Effect()
  AuthUser$ = this.actions$.ofType(AUTH_USER).pipe(
    mergeMap((data: Action & IAuth) => {
      const { name, password } = data;
      return this.userService.Auth(name, password);
    }),
    filter((data: IDataAuth) => !!data.token),
    mergeMap((data: IDataAuth) => {
      localStorage.setItem('token', data.token);
      return this.userService.getMyProfile();
    }),
    map((user: IUser) => {
      this.router.navigate(['/profile']);
      this.transformDate(user);
      return new LoadUserSuccess(user);
    }),
    catchError(error => {
      localStorage.setItem('token', undefined);
      this.router.navigate(['/singin']);
      return of(new AuthUserFail(error));
    })
  );

  @Effect()
  logoutUser$ = this.actions$.ofType(LOGOUT_USER).pipe(
    map(_ => {
      localStorage.setItem('token', undefined);
      this.router.navigate(['/singin']);
      return new LogoutUserSuccess();
    })
  );


  transformDate(user: IUser) {
    user.dateOfBirth = moment(user.dateOfBirth).format(settings.birthday.format);
    user.dateOfFirstLogin = moment(user.dateOfFirstLogin).format(settings.dateOfLogin.format);
    user.dateOfNextNotification = moment(user.dateOfNextNotification).format(settings.dateOfNotification.format);
  }
}
import { Action } from '@ngrx/store';
import IUser from 'src/app/interfaces/user';

export const LOAD_USER = '[User] loading user';
export const AUTH_USER = '[User] authorization';
export const FAIL_AUTH_USER = '[User] fail Authorization';
export const SUCCESS_USER = '[User] success loading';
export const FAIL_USER = '[User] fail loading';
export const LOGOUT_USER = '[User] logout';
export const LOGOUT_SUCCESS_USER = '[User] logout success';
export const SUCCESS_USERS = '[User] success loading users';
export const LOAD_USERS = '[User] loading users';
export const SUCCESS_EDIT = '[User] success edit';
export const EDIT_USER = '[User] edit';
export const SETTING_USER = '[User] settings';
export const DELETE_USER = '[User] delete';
export const ADD_USER = '[User] add';

export class LoadUser implements Action {
    readonly type = LOAD_USER;

    constructor() { }
}
export class AddUser implements Action {
  readonly type = ADD_USER;

  constructor(public user : IUser) { }
}
export class SettingUser implements Action {
  readonly type = SETTING_USER;

  constructor(public user : IUser) { }
}
export class LoadUserSuccess implements Action {
  readonly type = SUCCESS_USER;

  constructor(public loadUser: IUser) {  }
}
export class LoadUserFail implements Action {
  readonly type = FAIL_USER;

  constructor() {  }
}

export class AuthUserFail implements Action {
  readonly type = FAIL_AUTH_USER;

  constructor(public error) {  }
}
export class Auth implements Action {
  readonly type = AUTH_USER;

  constructor(public name: string, public password : string) {   }
}
export class Logout implements Action {
  readonly type = LOGOUT_USER;

  constructor() {   }
}
export class LogoutUserSuccess implements Action {
  readonly type = LOGOUT_SUCCESS_USER;
  constructor() { }
}
export class LoadUsers implements Action {
  readonly type = LOAD_USERS;

  constructor() { }
}
export class LoadUsersSuccess implements Action {
readonly type = SUCCESS_USERS;

constructor(public loadUsers: IUser[]) {  }
}
export class EditUser implements Action {
  readonly type = EDIT_USER;

  constructor(public user: IUser) { }
}
export class EditUserSuccess implements Action {
readonly type = SUCCESS_EDIT;

constructor() {  }
}
export class DeleteUser implements Action {
  readonly type = DELETE_USER;
  
  constructor(public id: string) {  }
  }
export type Action = LoadUser | LoadUserSuccess | LoadUserFail |
                     Auth | AuthUserFail | Logout | LogoutUserSuccess |
                     LoadUsers | LoadUsersSuccess |
                     EditUser | EditUserSuccess |
                     SettingUser | DeleteUser | AddUser;
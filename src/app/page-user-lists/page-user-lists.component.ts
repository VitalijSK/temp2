import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUserState } from '../store/reducers/user';
import { getUsers, LoadUsers, EditUser, DeleteUser, AddUser } from '../store';
import { Observable } from 'rxjs';
import { IUser } from 'server/models/User';

@Component({
  selector: 'app-page-user-lists',
  templateUrl: './page-user-lists.component.html',
  styleUrls: ['./page-user-lists.component.scss']
})
export class PageUserListsComponent implements OnInit {

  users$: Observable<IUser[]>;
  user: IUser;
  add: boolean;
  userEmpty: IUser;

  constructor(private store: Store<IUserState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadUsers());
    this.users$ = this.store.select(getUsers);
    this.add = false;
    this.userEmpty = {
      age: '',
      name: '',
      password: '',
      information: '',
      dateOfNextNotification: '',
      dateOfFirstLogin: '',
      dateOfBirth: ''
    }
  }
  selectUserById(user: IUser) {
    this.user = null;
    this.add = false;
    setTimeout(() => this.user = user, 0);
  }
  deleteUserById(id: string) {
    this.store.dispatch(new DeleteUser(id));
  }
  addForm() {
    this.add = !this.add;
  }
  submitUser(user: IUser) {
    user.id = this.user.id;
    user.role = this.user.role;
    this.store.dispatch(new EditUser(user));
  }
  addUser(user: IUser) {
    this.store.dispatch(new AddUser(user));
  }
}

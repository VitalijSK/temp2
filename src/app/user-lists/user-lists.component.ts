import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from 'server/models/User';

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.scss']
})
export class UserListsComponent implements OnInit {
  
  @Input() users: IUser[];
  @Output() selectUser : EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() deleteUser : EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
  
  selectUserById(id: string) {
    const user = this.users.find(userById(id));
    this.selectUser.emit(user);
  }
  deleteUserById(id: string) {
    this.deleteUser.emit(id);
  }
  trackByFn(index : number, user : IUser) {
    return user.id;
  }
}

const userById = (id : string) => (user : IUser) => user.id === id;

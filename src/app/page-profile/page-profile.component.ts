import { Component, OnInit } from '@angular/core';
import IUser from '../interfaces/user';
import { getUser } from '../store/reducers';
import { Store } from '@ngrx/store';
import { IUserState } from '../store/reducers/user';
import { Observable } from 'rxjs';
import { LoadUser } from '../store';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent implements OnInit {

  user$: Observable<IUser>;
  error: string;

  constructor(private store: Store<IUserState>) { }

  ngOnInit() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'update') {
        this.store.dispatch(new LoadUser());
      }
    });
    this.user$ = this.store.select(getUser);
  }
}

import { Component, OnInit } from '@angular/core';
import { IUser } from 'server/models/User';
import { UserService } from '../servies/user/user.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { tap} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getUser, getRole } from '../store/reducers';
import { IUserState } from '../interfaces/state';
import { SettingUser } from '../store';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.scss'],
})
export class PageSettingsComponent implements OnInit {

  user: IUser;
  error: boolean;
  success: boolean;
  id: string;
  role : number;;

  constructor(private userService: UserService,
    private translate: TranslateService,
    private store: Store<IUserState>) { }

  ngOnInit() {
    this.user = null;
    this.store.select(getUser).pipe(
      tap(user => {
        if (user !== null && user.id !== undefined) {
          this.user = user;
          this.id = user.id;
          this.role = user.role;
        } else {
          this.error = true
        }
      })
    ).subscribe();
  }

  onSubmit(user) {
    user.id = this.id;
    this.timeTransform(user);
    this.updateUser(user);
  }
  timeTransform(user) {
    user.dateOfBirth = moment(user.dateOfBirth).toISOString();
    user.dateOfFirstLogin = moment(user.dateOfFirstLogin).toISOString();
    user.dateOfNextNotification = moment(user.dateOfNextNotification).toISOString();
  }
  updateUser(user: IUser) {
        user.role = this.role;
        this.store.dispatch(new SettingUser(user));
  }
}

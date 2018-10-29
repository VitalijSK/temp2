import { Component, OnInit } from '@angular/core';
import { UserService } from '../servies/user/user.service';
import IUser from '../interfaces/user';
import * as moment from 'moment';
import settings from '../form-add/settings';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent implements OnInit {
  user : IUser;
  error : string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getMyProfile().subscribe(
      user => {
        user.dateOfBirth = moment(user.dateOfBirth).format(settings.birthday.format);
        user.dateOfFirstLogin= moment(user.dateOfFirstLogin).format(settings.dateOfLogin.format);
        user.dateOfNextNotification = moment(user.dateOfNextNotification).format(settings.dateOfNotification.format);
        this.user = user;
      },
      err => {
        this.error = err.error.text;
      }
    );
  }

}

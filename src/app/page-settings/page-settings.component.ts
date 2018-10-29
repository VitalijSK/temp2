import { Component, OnInit } from '@angular/core';
import { IUser } from 'server/models/User';
import { UserService } from '../servies/user/user.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import settings from '../form-add/settings';
import { TranslateService } from '@ngx-translate/core';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.scss']
})
export class PageSettingsComponent implements OnInit {

  data : IUser;
  error : string;
  success : boolean;
  id : string;

  constructor(private userService: UserService, 
              private translate: TranslateService) { }

  ngOnInit() {
    this.userService.getMyProfile().subscribe(user => {
      user.dateOfBirth = moment(user.dateOfBirth).format(settings.birthday.format);
      user.dateOfFirstLogin= moment(user.dateOfFirstLogin).format(settings.dateOfLogin.format);
      user.dateOfNextNotification = moment(user.dateOfNextNotification).format(settings.dateOfNotification.format);
      this.data = user;
      this.id = user.id;
    }, err => {
      this.error = err.error.text;
    });
  }

  onSubmit($event) {
    const user : IUser = {
      id : this.id,
      age : 0,
      name : '',
      password: ''
    };
    const form = [...$event.target];
    form.forEach(element => {
      const value = element.value.trim();
      const key = element.getAttribute('ng-reflect-name');
      user[key] = value;
    }); 

    this.timeTransform(user);

    this.updateUser(user);  
  }
  timeTransform(user) {
    user.dateOfBirth = moment(user.dateOfBirth).toISOString();
    user.dateOfFirstLogin= moment(user.dateOfFirstLogin).toISOString();
    user.dateOfNextNotification = moment(user.dateOfNextNotification).toISOString();
  }
  updateUser(user : IUser) {
    this.userService.updateUser(user).subscribe(data => {
      this.translate.get('Your information was updated!').subscribe((message: string) => {
        Swal(message);
      });
        
    }, err => {
      const header$ : Observable<string> = this.translate.get('Oops...');
      const text$ : Observable<string> = this.translate.get(err.error.text);
      const combined = combineLatest(header$, text$);
      combined.subscribe(
        ([header, text]) => {
          Swal(header , text, 'error');
        });
    })
  }
}

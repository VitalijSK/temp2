import { Component, OnInit } from '@angular/core';
import { IUser } from 'server/models/User';
import { UserService } from '../servies/user/user.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import settings from '../form-add/settings';
import { TranslateService } from '@ngx-translate/core';
import { Observable, combineLatest, of } from 'rxjs';
import { catchError, tap, switchMap, take } from 'rxjs/operators';
import { CommunicationService } from '../servies/communication/communication.service';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.scss']
})
export class PageSettingsComponent implements OnInit {

  data: IUser;
  error: string;
  success: boolean;
  id: string;

  constructor(private userService: UserService,
              private translate: TranslateService,
              private communicationService: CommunicationService) { }

  ngOnInit() {
    this.userService.getMyProfile().pipe(
      tap(user => {
        user.dateOfBirth = moment(user.dateOfBirth).format(settings.birthday.format);
        user.dateOfFirstLogin = moment(user.dateOfFirstLogin).format(settings.dateOfLogin.format);
        user.dateOfNextNotification = moment(user.dateOfNextNotification).format(settings.dateOfNotification.format);
        this.data = user;
        this.id = user.id;
      }),
      catchError(err => {
        this.error = err.error.text;
        return of();
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
    this.userService.updateUser(user).pipe(
      take(1),
      tap(_ => {
        this.communicationService.getCorrectInfo();
        localStorage.removeItem('update')
        localStorage.setItem('update', null);
      }),
      switchMap(_ => this.translate.get('Your information was updated!')),
      tap((message: string) => {
        Swal(message)
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
    ).subscribe();
  }
}

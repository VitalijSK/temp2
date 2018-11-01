import { Component, OnInit } from '@angular/core';
import IUser from '../interfaces/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page-singup',
  templateUrl: './page-singup.component.html',
  styleUrls: ['./page-singup.component.scss']
})
export class PageSingupComponent implements OnInit {
  user ?: IUser;
  data ?: IUser;

  constructor(private translate : TranslateService) { }

  ngOnInit() {
    this.data = {
        age : '',
        name : '',
        password: '',
        information : '',
        dateOfNextNotification : '',
        dateOfFirstLogin : '',
        dateOfBirth : ''
      }
    
  }

  onSubmit(user) {
    this.user = user;
  }
}

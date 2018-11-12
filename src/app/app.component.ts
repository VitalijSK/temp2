import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserState } from './interfaces/state';
import { Store } from '@ngrx/store';
import { LoadUser, getRole, Logout } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  role$ : Observable< number >;
  loading$ : Observable< boolean >;

  constructor(private translate: TranslateService, 
              private router: Router,
              private store : Store <IUserState>) {}
  ngOnInit () {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.store.dispatch(new LoadUser());
    this.role$ = this.store.select(getRole);
  }
  selectLanguage($event) {
    const language = $event.target.value;
    this.translate.use(language);
  }
  logout() {
    this.store.dispatch(new Logout());
  }
}

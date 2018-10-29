import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StateService } from './servies/state/state.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IUserState } from './interfaces/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  state : BehaviorSubject< IUserState >;

  constructor(private translate: TranslateService, 
              private stateServies : StateService,
              private router: Router) {}
  ngOnInit () {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.stateServies.getStateChange();
    this.state = this.stateServies.getCurrectValue();
  }
  selectLanguage($event) {
    const language = $event.target.value;
    this.translate.use(language);
  }
  logout() {
    localStorage.setItem('token', undefined);
    this.stateServies.getStateChange();
    this.router.navigate(['/singin']);
  }
}

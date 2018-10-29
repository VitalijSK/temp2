import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserState } from '../../interfaces/state';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { catchError, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private initialState : IUserState = {
      role : 0
  }
  private state = new BehaviorSubject<IUserState>(this.initialState);

  constructor(private userService : UserService,
              private router : Router) { }

  getStateChange() {
    this.userService.getMyProfile().subscribe( data => {
      const state = { role : 1 };
      this.state.next(state);
    }, err => {
      const state = { role : 0 };
      this.state.next(state);
    })
  }
  getValueGuardUser() : Observable <boolean> {
    return this.userService.getMyProfile().pipe( 
      take(1),
      map(data => {
       if (!data) {
        this.router.navigate(['/singin']);
        return false;
       }
        return true;
      }), catchError( () => this.router.navigate(['/singin']))
    );
  }
  getCurrectValue() : BehaviorSubject<IUserState> {
      return this.state;
  }
}

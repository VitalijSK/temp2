import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUserState } from '../../interfaces/state';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { catchError, map, take } from 'rxjs/operators';
import { CommunicationService } from '../communication/communication.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private initialState: IUserState = {
    role: 0
  };
  private state = new BehaviorSubject<IUserState>(this.initialState);

  constructor(private userService: UserService,
              private router: Router,
              private communicationService : CommunicationService) { }

  getStateChange() {
    this.communicationService.getCorrectInfo();
    this.userService.getMyProfile().pipe(
      take(1),
      map(data => {
        const state = { role: 1 };
        this.state.next(state);
      }),
      catchError(err => {
        const state = { role: 0 };
        this.state.next(state);
        return of();
      })
    ).subscribe();
  }
  getValueGuardUser(): Observable<boolean> {
    return this.userService.getMyProfile().pipe(
      take(1),
      map(data => {
        if (!data) {
          this.router.navigate(['/singin']);
          return false;
        }
        return true;
      }),
      catchError(err => {
        this.router.navigate(['/singin']);
        return of(false);
      })
    );
  }
  getCurrectValue(): BehaviorSubject<IUserState> {
    return this.state;
  }
}

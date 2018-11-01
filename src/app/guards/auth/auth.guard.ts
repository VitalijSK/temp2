import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StateService } from 'src/app/servies/state/state.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private stateService : StateService) {}
   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable <boolean> {
    return this.stateService.getValueGuardUser();
  }
}
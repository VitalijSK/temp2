import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StateService } from 'src/app/servies/state/state.service';
import {Observable} from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private stateService : StateService,
              private router : Router) {}
   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable <boolean> {
    return this.stateService.getValueGuardUser();
  }
}
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IUserState } from 'src/app/store/reducers/user';
import { getRole } from 'src/app/store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private store : Store<IUserState>,
              private router : Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.store.select(getRole).pipe(
        map((role : number) => {
          if (role !== 2) {
            this.router.navigate(['/singin']);
            return false;
          } 
          return true;
        })
      );
  }
}

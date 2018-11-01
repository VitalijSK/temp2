import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { UserService } from '../../servies/user/user.service';
import { of, Observable } from 'rxjs';
import { map, switchMap} from 'rxjs/operators';
import { IErrorHandler } from 'src/app/interfaces/validators';

export function forbiddenCurrectNameValidator(userService: UserService, currectName : string): AsyncValidatorFn {
    return (control: AbstractControl):  Observable<IErrorHandler | null> => {
        const name: string = control.value;
        if (currectName === name) {
            return of(null);
        }
        return findCurrectName(name, userService);
    };
  }

  const findCurrectName = (name : string, userService: UserService) => {
    return userService.getCurrectName(name).pipe(
        switchMap(() => userService.getCurrectName(name)),
        map(
        findName =>   {
            return (findName) ? { 'forbiddenCurrectName' : 
                 { value: `Your name already used` }}  : null
        }));
  };
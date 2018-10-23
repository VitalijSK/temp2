import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { UserService } from '../../servies/user/user.service';
import { timer } from 'rxjs';
import { map, switchMap} from 'rxjs/operators';

export function forbiddenCurrectNameValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl):  any => {
        const name: string = control.value;
        
        return findCurrectName(name, userService);
    };
  }

  const findCurrectName = (name : string, userService: UserService) => {
    const debounceTime = 300; 
    return timer(debounceTime).pipe(
        switchMap(() => userService.getCurrectName(name)),
        map(
        findName =>  (findName) ? { 'forbiddenCurrectName' : 
                 { value: `Your name already used` }}  : null
      ));
  };
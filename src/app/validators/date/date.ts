import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
import { IErrorHandler } from 'src/app/interfaces/validators';


export function forbiddenDateValidator(formatDate : string): ValidatorFn {
    return (control: AbstractControl): IErrorHandler | null => {
        if (control.value === null || control.value === '') return null;

        const date : string = control.value;
        
        if (date.length === 0) {
            return null;
        }
        return !checkDate(date, formatDate) 
          ? { 'forbiddenDate': { value: `Date must be format (${formatDate})`} } 
          : null; 
    };
  }

const checkDate = (date : string, formatDate : string) => moment(date, formatDate,true).isValid();
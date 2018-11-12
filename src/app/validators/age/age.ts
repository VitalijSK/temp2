import { AbstractControl, ValidatorFn } from '@angular/forms';
import { IErrorHandler } from 'src/app/interfaces/validators';

export function forbiddenAgeValidator(min: number, max : number): ValidatorFn {
    return (control: AbstractControl): IErrorHandler | null => {
        if (control.value === null) return null;

        const value : number = control.value;
        let data : IErrorHandler | null;

        if (!checkInt(value)) {
            data = { 'forbiddenAge': {value: `Age must be intenger`} };
        } else if (!checkInterval(min, max, value)) {
            data = { 'forbiddenAge': {value: `Age must be ${min} and ${max} `} };
        } else {
            data = null;
        }

        return data; 
    };
  }

export const checkInterval = (min : number, max : number, value : number) => min <= value && max >= value;
export const checkInt = (value : number) => !(Math.floor(value) - value);
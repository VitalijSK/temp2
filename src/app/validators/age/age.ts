import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenAgeValidator(min: number, max : number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: {value: string}} | null => {
        if (control.value === null || control.value === '') return null;

        const value : number = control.value;
        let data : {[key: string]: {value: string}} | null;

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

const checkInterval = (min : number, max : number, value : number) => min <= value && max >= value;
const checkInt = (value : number) => !(Math.floor(value) - value);
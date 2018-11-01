import { AbstractControl, ValidatorFn } from '@angular/forms';
import { IErrorHandler } from 'src/app/interfaces/validators';

export function forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl):  IErrorHandler | null => {
        if (control.value === null) { 
            return null; 
        }
        const name : string = control.value.trim();
        
        if (checkMiddleWare(name, checkRusLetter)) {
            return { 'forbiddenName': 
                        { value: `any Russian symbols are not allowed` }                
                    };
        }
        if (checkMiddleWare(name, checkRusLetter)) {
            return { 'forbiddenName': 
                        { value: `any Russian symbols are not allowed` }                    
                    }
        } else if (checkMiddleWare(name, checkCountName)) {
            return { 'forbiddenName': 
                        { value: `one or two words, no more and one space between words` } 
                    }
        } else if (checkMiddleWare(name, checkSymbolName)) {
            return { 'forbiddenName': 
                        { value: `Special symbols are not allowed` } 
                    }
        } else if (checkMiddleWare(name, checkUpperFirstLetter)) {
            return { 'forbiddenName': 
                        { value: `the first letter of the word should be UpperCase rest LowerCase` } 
                    }
        } else {
            return null;
        }
    };
  }

const checkMiddleWare = (name: string, callback : Function) => {
    const arrName = name.split('');
    return callback(arrName);
}

//callback functions
const checkRusLetter = (arrName : string[]) => arrName.some(isRusLetter);
const checkCountName = (arrName : string[]) => !arrName.every(isTwoWord());
const checkUpperFirstLetter = (arrName : string[]) => !arrName.every(isCheckLetter());
const checkSymbolName = (arrName : string[]) => !arrName.every(isLetter);

//secondary functions
const  isCheckLetter = () => {
    let allow = false;
    return (letter, index) => {
        if (index === 0) {
            return isFirstUpparCase(letter);
        } else if (letter === ' ') {
            allow = true;
            return true;
        } else if (allow) {
            allow = false;
            return isFirstUpparCase(letter);
        } else {
            return !isFirstUpparCase(letter);
        }  
    };
};
const isRusLetter = (c : string) => (c >= 'А' && c <= 'Я') || (c >= 'а' && c <= 'я');
const isLetter = (letter: string) =>  (letter !== ' ') ? letter.toUpperCase() !== letter.toLowerCase() : true;
const  isFirstUpparCase = (letter : string) =>  letter === letter.toUpperCase();
const  isTwoWord = () => {
    let countSpace = 0;
    return (letter) => {
        if (letter === ' ') {
           if (countSpace === 1) {
               return false;
           } else {
               countSpace++;
           }
        } 
        return true;
    }
}
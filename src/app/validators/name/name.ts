import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl):  {[key: string]: {value: string}} | null => {
        if (control.value === null) return null;
        const name : string = control.value.trim();
        let data: {[key: string]: {value: string}} | null;
        
        if (checkMiddleWare(name, checkRusLetter)) {
            data = { 'forbiddenName': 
                        { value: `any Russian symbols are not allowed` } 
                        
                    }
        }
        if (checkMiddleWare(name, checkRusLetter)) {
            data = { 'forbiddenName': 
                        { value: `any Russian symbols are not allowed` } 
                        
                    }
        } else if (checkMiddleWare(name, checkCountName)) {
            data = { 'forbiddenName': 
                        { value: `one or two words, no more and one space between words` } 
                    }
        } else if (checkMiddleWare(name, checkSymbolName)) {
            data = { 'forbiddenName': 
                        { value: `Special symbols are not allowed` } 
                    }
        } else if (checkMiddleWare(name, checkUpperFirstLetter)) {
            data = { 'forbiddenName': 
                        { value: `the first letter of the word should be UpperCase rest LowerCase` } 
                    }
        } else {
            data = null;
        }

        return data;
    };
  }

const checkMiddleWare = (name: string, callback : Function) => {
    const arrName = name.split('');
    return callback(arrName);
}

//callback functions
const checkRusLetter = (arrName : Array<String>) => arrName.some(isRusLetter);
const checkCountName = (arrName : Array<String>) => !arrName.every(isTwoWord());
const checkUpperFirstLetter = (arrName : Array<String>) => !arrName.every(isCheckLetter());
const checkSymbolName = (arrName : Array<String>) => !arrName.every(isLetter);

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
const  isRusLetter = (c) => (c >= 'А' && c <= 'Я') || (c >= 'а' && c <= 'я');
const  isLetter = (letter) =>  (letter !== ' ') ? letter.toUpperCase() !== letter.toLowerCase() : true;
const  isFirstUpparCase = (letter) =>  letter === letter.toUpperCase();
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
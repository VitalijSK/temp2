import { Component,  OnInit } from '@angular/core';
import {  FormBuilder,  FormGroup, Validators } from '@angular/forms';
import settings from './settings';
import { forbiddenAgeValidator } from '../validators/age';
import { forbiddenDateValidator } from '../validators/date';
import { forbiddenNameValidator, forbiddenCurrectNameValidator } from '../validators/name';
import { UserService } from '../servies/user/user.service';
import IUser from '../interfaces/user';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss'],
})
export class FormAddComponent implements OnInit {

    title : string;
    profileForm !: FormGroup;
    user !: IUser;

    constructor(private fb: FormBuilder, private userService: UserService) {}

    ngOnInit() {
        this.title = 'Sing Up';
        this.profileForm = this.fb.group({
            name : ['', [Validators.required, Validators.minLength(settings.name.min), forbiddenNameValidator()], forbiddenCurrectNameValidator(this.userService)],
            password : ['', [Validators.required, Validators.minLength(settings.password.min)]],
            age : ['', [Validators.required, forbiddenAgeValidator(settings.age.from, settings.age.till)]],
            birthday : ['', [forbiddenDateValidator(settings.birthday.format)]],
            dateOfLogin : ['', [forbiddenDateValidator(settings.dateOfLogin.format)]],
            dateOfNotification : ['', [forbiddenDateValidator(settings.dateOfNotification.format)]]
        });
        this.user = {
            name: '',
            age : 0
        }
        Object.defineProperty(this.user, 'information', {
            enumerable: false,
            value : false,
            writable: true 
        })
    }
    checkSymbol(event) {
        const { key } = event;
        const length = event.target.value.length;
        const prevLetter = event.target.value[length  - 1];
        if (key === ' ' && prevLetter === ' ' || length < settings.name.min && key === ' ') {
            event.preventDefault();
        }
    }
    cantSpace(event) {
        const { key } = event;
        if (key === ' ') {
            event.preventDefault();
        }
    }
    checkInvalid(input : string) {
        return this.profileForm.controls[input].invalid && 
        (this.profileForm.controls[input].dirty ||
            this.profileForm.controls[input].touched)
    }

    checkValid(input : string) {
        return !this.checkInvalid(input) && 
            this.profileForm.controls[input].value !== '';
    }

    onSubmit() {
        const form = this.profileForm.controls;
        for (const key in form) {
            const value = form[key].value.trim();
            if (value !== '') {
                this.user[key] = value;
            }
        }
        this.profileForm.reset();
        this.user.information = true;
    }

}

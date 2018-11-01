import { Input, Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    @Input() user: IUser

    profileForm !: FormGroup;
    @Output() submitUser = new EventEmitter<IUser>();

    constructor(private fb: FormBuilder, private userService: UserService) { }

    ngOnInit() {
        this.profileForm = this.fb.group({
            name: [this.user.name, [Validators.required, Validators.minLength(settings.name.min), forbiddenNameValidator()], forbiddenCurrectNameValidator(this.userService, this.user.name)],
            password: [this.user.password, [Validators.required, Validators.minLength(settings.password.min)]],
            age: [this.user.age, [Validators.required, forbiddenAgeValidator(settings.age.from, settings.age.till)]],
            dateOfBirth: [this.user.dateOfBirth, [forbiddenDateValidator(settings.birthday.format)]],
            dateOfFirstLogin: [this.user.dateOfFirstLogin, [forbiddenDateValidator(settings.dateOfLogin.format)]],
            dateOfNextNotification: [this.user.dateOfNextNotification, [forbiddenDateValidator(settings.dateOfNotification.format)]],
            information: [this.user.information]
        });
    }
    checkSymbol(event) {
        const { key } = event;
        const length = event.target.value.length;
        const prevLetter = event.target.value[length - 1];
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
    checkInvalid(input: string) {
        return this.profileForm.controls[input].invalid &&
            (this.profileForm.controls[input].dirty ||
                this.profileForm.controls[input].touched)
    }

    checkValid(input: string) {
        return !this.checkInvalid(input) &&
            this.profileForm.controls[input].value !== '' &&
            this.profileForm.controls[input].value !== null;
    }

    onSubmit() {
        const user: IUser = {
            age: 0,
            name: '',
            password: ''
        };
        for (const key in this.profileForm.controls) {
            user[key] = this.profileForm.get(key).value.trim();
        }
        this.submitUser.emit(user);
    }

}

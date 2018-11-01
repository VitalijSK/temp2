import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../validators/name';
import { UserService } from '../servies/user/user.service';
import IUser from '../interfaces/user';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
    title: string;
    profileForm !: FormGroup;
    loading !: Boolean;
    password !: string;
    incorrectName !: string;

    constructor(private fb: FormBuilder, private userService: UserService) { }

    ngOnInit() {
        this.title = 'Forgot Password';
        this.loading = false;
        this.profileForm = this.fb.group({
            name: ['', [Validators.required, forbiddenNameValidator()]],
        });
    }

    checkInvalid(input: string) {
        return this.profileForm.controls[input].invalid &&
            (this.profileForm.controls[input].dirty ||
                this.profileForm.controls[input].touched)
    }

    checkValid(input: string) {
        return !this.checkInvalid(input) &&
            this.profileForm.controls[input].value !== '';
    }

    onSubmit() {
        const form = this.profileForm.controls;
        this.password = '';
        this.incorrectName = '';
        this.loading = true;
        this.userService.getPassword(form.name.value).pipe(
            tap(passowrd => {
                this.password = passowrd;
                this.loading = false;
            }), catchError(err => {
                this.loading = false;
                this.incorrectName = err.error.text;
                return of();
            })
        ).subscribe();
        this.profileForm.reset();
    }


}

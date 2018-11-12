import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import settings from '../form-add/settings';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IUserState } from '../store/reducers/user';
import { Auth } from '../store/actions/index';
import { getLoading, getError } from '../store';
import { IUser } from 'server/models/User';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

    profileForm : FormGroup;
    loading$  : Observable< boolean >;
    user$ : Observable <IUser>;
    error$ : Observable< boolean >;

    constructor(private fb: FormBuilder,
                private store: Store<IUserState>) { }

    ngOnInit() {
        this.profileForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(settings.name.min)]],
            password: ['', [Validators.required, Validators.minLength(settings.password.min)]],
        });
        this.loading$ = this.store.select(getLoading);
        this.error$ = this.store.select(getError);
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
    onSubmit() {
        const name: string = this.profileForm.controls['name'].value;
        const password: string = this.profileForm.controls['password'].value;
        
        this.store.dispatch(new Auth(name, password))
        // .pipe(
        //     filter(data => !!data.token),
        //     tap(data => {
        //         localStorage.setItem('token', data.token);
        //         this.store.dispatch(new LoadUser());
        //     }),
        //     switchMap(_ => this.store.select(getUser)),
        //     tap(_ => this.router.navigate(['/profile'])),
        //     catchError(err => {
        //         this.incorrect = err.error.text;
        //         return of();
        //     }),
        //     finalize(() => this.loading = false)
        // ).subscribe();
    }
}

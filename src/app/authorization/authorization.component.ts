import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import {  FormBuilder,  FormGroup, Validators } from '@angular/forms';
import settings from '../form-add/settings';
import { Router } from '@angular/router';
import { UserService } from '../servies/user/user.service';
import { StateService } from '../servies/state/state.service';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

    profileForm !: FormGroup;
    loading !: Boolean;
    incorrect !: string;

    constructor(private fb: FormBuilder, 
                private userService: UserService,
                private stateServies : StateService,
                private router: Router) {}

    ngOnInit() {
        this.profileForm = this.fb.group({
            name : ['', [Validators.required, Validators.minLength(settings.name.min)]],
            password : ['', [Validators.required, Validators.minLength(settings.password.min)]],
        });
        this.loading = false;
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
    onSubmit() {
        this.loading = true;
        this.incorrect = '';
        const name : string = this.profileForm.controls['name'].value;
        const password : string = this.profileForm.controls['password'].value;
        this.userService.Auth(name, password).subscribe((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                this.stateServies.getStateChange();
                this.stateServies.getCurrectValue().subscribe( _ => {
                    this.router.navigate(['/profile']);
                });
            }
            this.loading = false;
        }, (err) => {
            this.incorrect = err.error.text;
            this.loading = false;
        })
    }

}

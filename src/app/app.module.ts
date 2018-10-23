import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormAddComponent } from './form-add/form-add.component';

import { KeysPipe } from './pipes/getKeysObj.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthorizationComponent } from './authorization/authorization.component';

const appRoutes: Routes = [
    { 
        path: '', 
        redirectTo: '/singin', 
        pathMatch: 'full' },
    { path: 'singin', component: AuthorizationComponent },
    { path: 'singup', component: FormAddComponent },
    { path: 'forgot', component: ForgotComponent },
    { path: 'notfound',  component: NotFoundComponent },
    {   path: '**',
        redirectTo: '/notfound',
        pathMatch: 'full' }
  ];

@NgModule({
  declarations: [
    AppComponent,
    FormAddComponent,
    KeysPipe,
    NotFoundComponent,
    ForgotComponent,
    AuthorizationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

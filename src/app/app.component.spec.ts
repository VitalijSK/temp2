import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgReduxModule } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { FormAddComponent } from './form-add/form-add.component';

import { ForgotComponent } from './forgot/forgot.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';
import { PageForgotComponent } from './page-forgot/page-forgot.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { PageSingupComponent } from './page-singup/page-singup.component';

import { AuthGuard } from './guards/auth/auth.guard';
import { GuestGuard } from './guards/auth/guest.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { PageTreeComponent } from './page-tree/page-tree.component';
import { ItemComponent } from './item/item.component';
import { ItemHostDirective } from './directives/item/item-host.directive';
import { ItemsTreeComponent } from './items-tree/items-tree.component';

import { EffectsModule } from '@ngrx/effects';
import { reducers, effects, metaReducers } from './store';
import { StoreModule } from '@ngrx/store';
import { PageUserListsComponent } from './page-user-lists/page-user-lists.component';
import { UserListsComponent } from './user-lists/user-lists.component';
import { UserElementComponent } from './user-element/user-element.component';
const appRoutes: Routes = [
  { 
      path: '', 
      redirectTo: '/singin', 
      pathMatch: 'full' },
  { path: 'singin', component: AuthorizationComponent,
    canActivate : [GuestGuard] },
  { path: 'singup', component: PageSingupComponent },
  { path: 'profile', 
    component: PageProfileComponent,
    canActivate : [AuthGuard]
  },
  { path: 'settings', 
    component: PageSettingsComponent,
    canActivate : [AuthGuard]
  },
  { path: 'users', 
    component: PageUserListsComponent,
    canActivate : [AdminGuard]
  },
  { path: 'tree', component : PageTreeComponent },
  { path: 'forgot', component: PageForgotComponent },
  { path: 'notfound',  component: PageNotfoundComponent },
  {   path: '**',
      redirectTo: '/notfound',
      pathMatch: 'full' }
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ TranslateModule.forRoot({
        loader: { provide: TranslateLoader,
 useValue: {} }}),
        RouterModule.forRoot(appRoutes)
      ],
      schemas: [ NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgReduxModule } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { FormAddComponent } from './components/form-add/form-add.component';

import { ForgotComponent } from './components/forgot/forgot.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { PageSettingsComponent } from './pages/page-settings/page-settings.component';
import { PageForgotComponent } from './pages/page-forgot/page-forgot.component';
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component';
import { PageSingupComponent } from './pages/page-singup/page-singup.component';

import { AuthGuard } from './guards/auth/auth.guard';
import { GuestGuard } from './guards/auth/guest.guard';
import { AdminGuard } from './guards/admin/admin.guard';

import { EffectsModule } from '@ngrx/effects';
import { reducers, effects, metaReducers } from './store';
import { StoreModule } from '@ngrx/store';
import { PageUserListsComponent } from './pages/page-user-lists/page-user-lists.component';
import { UserListsComponent } from './components/user-lists/user-lists.component';
import { UserElementComponent } from './components/user-element/user-element.component';
import { PageArticlesComponent } from './pages/page-articles/page-articles.component';
import { PageAtricleEditComponent } from './pages/page-atricle-edit/page-atricle-edit.component';
import { PageAtricleAddComponent } from './pages/page-atricle-add/page-atricle-add.component';
import { FormArticleComponent } from './components/article/form-article/form-article.component';
import { FormArticleEditComponent } from './components/article/form-article-edit/form-article-edit.component';
import { FormArticleAddComponent } from './components/article/form-article-add/form-article-add.component';
import { ListArticleComponent } from './components/article/list-article/list-article.component';
import { ArticleComponent } from './components/article/article/article.component';
import { ShortTextPipe } from './pipes/short-text.pipe';
import { PageArticleComponent } from './pages/page-article/page-article.component';
import { CommentComponent } from './components/comment/comment.component';
import { FormCommentComponent } from './components/comment/form-comment/form-comment.component';
import { PageArticleOfferComponent } from './pages/page-article-offer/page-article-offer.component';
import { PageArticleRejectComponent } from './pages/page-article-reject/page-article-reject.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'https://localhost:3000/api/language/', '.json');
}

const appRoutes: Routes = [
    { 
        path: '', 
        redirectTo: '/singin', 
        pathMatch: 'full' },
    { path : 'articles', component : PageArticlesComponent },
    { path : 'article/offer', component : PageAtricleAddComponent },
    { path : 'articles/offer', component : PageArticleOfferComponent },
    { path : 'articles/reject', component : PageArticleRejectComponent },
    { path : 'article/:id', component : PageArticleComponent},
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
    { path: 'forgot', component: PageForgotComponent },
    { path: 'notfound',  component: PageNotfoundComponent },
    {   path: '**',
        redirectTo: '/notfound',
        pathMatch: 'full' }
  ];

@NgModule({
  declarations: [
    AppComponent,
    FormAddComponent,
    ForgotComponent,
    AuthorizationComponent,
    PageProfileComponent,
    PageSettingsComponent,
    PageForgotComponent,
    PageNotfoundComponent,
    PageSingupComponent,
    PageUserListsComponent,
    UserListsComponent,
    UserElementComponent,
    PageArticlesComponent,
    PageAtricleEditComponent,
    PageAtricleAddComponent,
    FormArticleComponent,
    FormArticleEditComponent,
    FormArticleAddComponent,
    ListArticleComponent,
    ArticleComponent,
    ShortTextPipe,
    PageArticleComponent,
    CommentComponent,
    FormCommentComponent,
    PageArticleOfferComponent,
    PageArticleRejectComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgReduxModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,
            NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

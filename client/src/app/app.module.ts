import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {AppComponent} from './app.component';
//import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UsersComponent} from './users/users.component';
import {ProfileComponent} from './profile/profile.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {GrowlModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'details',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent
      },
      {
        path: 'settings',
        component: AccountSettingsComponent
      }
    ]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    UsersComponent,
    ProfileComponent,
    ChangePasswordComponent,
    AccountSettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    GrowlModule,
    ConfirmDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

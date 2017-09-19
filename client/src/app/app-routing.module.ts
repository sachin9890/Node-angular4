import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // outlet: 'popup'
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}

//export const routedComponents = [LoginComponent, SignupComponent];


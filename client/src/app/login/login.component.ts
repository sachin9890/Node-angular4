import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})


export class LoginComponent implements OnInit {
  userData: object = {
    username: null,
    password: null
  }
  inValidUser: boolean = false;

  msgs: Message[] = [];

  constructor(private _logService: LoginService,
              private router: Router) {
    if (localStorage.getItem('username') && localStorage.getItem('id')) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
  }

  login() {
    this._logService.login(this.userData).then(res => {
      if (res.username && res.id) {
        localStorage.setItem('username', res.username);
        localStorage.setItem('id', res.id);
        localStorage.setItem('email', res.email);
        this.router.navigate(['/dashboard']);
      } else {
        this.msgs.push({severity:'error', summary:'Login Failed', detail:'User name or password wrong'});
      }
    });
  }

  loginFacebook() {
    this._logService.loginFacebook().then(res => {
      if (res.username && res.id) {
        localStorage.setItem('username', res.username);
        localStorage.setItem('id', res.id);
        localStorage.setItem('email', res.email);
        this.router.navigate(['/dashboard']);
      }
    });
  }

}

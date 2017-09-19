import {Component, OnInit} from '@angular/core';
import {SignupService} from './signup.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService]
})
export class SignupComponent implements OnInit {
  isUserExists: boolean = false;
  userData: object = {
    "username": null,
    "firstName": null,
    "lastName": null,
    "email": null,
    "password": null,
    "gender": 'default',
    "phone": null
  };

  constructor(private _signupService: SignupService,
              private router: Router) {
  }

  ngOnInit() {
  }

  createUser() {
    this._signupService.createUser(this.userData).then(res => {
      if (!res.status) {
        this.router.navigate(['/login']);
      }
    });
  }

  checkUserName(uname: string) {
    this._signupService.checkUserName(uname).then(res => {
      this.isUserExists = res;
    });
  }

}

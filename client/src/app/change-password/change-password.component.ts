import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ChangePasswordService} from './change-password.service';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [ChangePasswordService]
})
export class ChangePasswordComponent implements OnInit {
  userData: object = {
    uname: localStorage.getItem('username'),
    password: null,
    newPassword: null,
    cNewPassword: null
  }
  showErr: boolean = true;
  errorMsg: string = "";

  msgs: Message[] = [];

  constructor(private _router: Router, private _changePasswordService: ChangePasswordService) {
    if (!localStorage.getItem('username') && !localStorage.getItem('id')) {
      this._router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.msgs = [];
    this._changePasswordService.changePassword(this.userData).then(res => {
      if (!res.status) {
        if (res.msg === 'success') {
          this.msgs.push({severity:'success', summary:'Success', detail:"Password changed successfully !!"});
          //this._router.navigate(['/dashboard']);
        } else {
          this.msgs.push({severity:'error', summary:'Error', detail:res.msg});
        }
      } else {
        localStorage.clear();
        this._router.navigate(['/login']);
      }

    });
  }

}

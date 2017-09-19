import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import  {AccountSettingsService} from './account-settings.service';
import {ConfirmationService} from 'primeng/primeng';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
  providers:[AccountSettingsService,ConfirmationService]
})
export class AccountSettingsComponent implements OnInit {

  showPopUp:boolean=false;
  constructor(private _router: Router, private _accountSettingsService:AccountSettingsService, private confirmationService: ConfirmationService) {
    if (!localStorage.getItem('username') && !localStorage.getItem('id')) {
      this._router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

  deleteAccount(){


    this.confirmationService.confirm({
      message: 'Do you want to delete your account?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        //Actual logic to perform a confirmation
        this._accountSettingsService.deleteAccount().then(res=>{
          console.log(res);
          localStorage.clear();
          this._router.navigate(['/login']);
        });
      }
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from './profile.service';
import {Message} from 'primeng/primeng';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  msgs: Message[] = [];
  userData: object = {
    "username": null,
    "firstName": null,
    "lastName": null,
    "email": null,
    "password": null,
    "gender": 'default',
    "phone": null
  };
  isEdit: boolean = true;
  showMsg: boolean = false;
  resMsg: string;
  imgSrc: string = "//placehold.it/100";
  imgData: object;

  constructor(private _router: Router, private _profileService: ProfileService) {
    if (!localStorage.getItem('username') && !localStorage.getItem('id')) {
      this._router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this._profileService.getProfile().then(res => {
      if (!res.status) {
        this.userData = res;
      } else {
        localStorage.clear();
        this._router.navigate(['/login']);
      }
    })
  }

  editProfile(userData: object) {
    this.msgs = [];
    this._profileService.editProfile(userData).then(res => {
      if (!res.status) {
        this.isEdit = true;
      /*  this.resMsg = res.msg;
        this.showMsg = true;*/
        this.msgs.push({severity:'success', summary:'Success Message', detail:res.msg});
      } else {
        localStorage.clear();
        this._router.navigate(['/login']);
      }
    })
  };

  uploadPhoto(event) {
    console.log(event.srcElement.files[0]);
    this.imgData = event.srcElement.files;
    /*console.log(event.srcElement.files[0].name);
     this.imgSrc = event.srcElement.files[0].name;
     console.log(event);*/
    /*this._profileService.uploadPhoto(new FormData(event.srcElement.files)).then(res => {
     console.log(res);
     });*/
  }

}

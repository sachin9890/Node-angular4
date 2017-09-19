import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  constructor(private _router: Router, private _dashboardService: DashboardService) {
    if (!localStorage.getItem('username') && !localStorage.getItem('id')) {
      this._router.navigate(['/login']);
    }
  }

  showPopUp: boolean = false;
  userData: object = {userName: localStorage.getItem('username'), email: localStorage.getItem('email')}

  ngOnInit() {
  }

  profile() {
    this.showPopUp = !this.showPopUp;
  }

  logout() {
    this._dashboardService.logout().then(res => {
      localStorage.clear();
      this._router.navigate(['/login']);
    });
  }

}

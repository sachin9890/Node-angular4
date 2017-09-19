import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private _router: Router) {
    if (!localStorage.getItem('username') && !localStorage.getItem('id')) {
      this._router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}

import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountSettingsService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private apiURL = 'http://localhost:3000/user/';  // URL to web api
  handleError;

  constructor(private http:Http) { }

  deleteAccount(){
    return this.http
      .delete(this.apiURL+"deleteUser", {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

}

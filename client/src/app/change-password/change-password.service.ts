import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChangePasswordService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'http://localhost:3000/user/changePassword';  // URL to web api
  handleError;

  constructor(private http: Http) {
  }

  changePassword(userData: object) {
    return this.http
      .put(this.heroesUrl, JSON.stringify(userData), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
}

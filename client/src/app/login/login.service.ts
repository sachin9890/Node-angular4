import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'http://localhost:3000/user/login';  // URL to web api
  handleError;

  constructor(private http: Http) {
  }

  login(userData: object) {
    return this.http
      .post(this.heroesUrl, JSON.stringify(userData), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  loginFacebook() {
    return this.http
      .get(this.heroesUrl + "/facebook", {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


}

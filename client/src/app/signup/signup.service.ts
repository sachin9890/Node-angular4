import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SignupService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'http://localhost:3000/user/';  // URL to web api
  handleError;

  constructor(private http: Http) {
  }

  createUser(userData: object) {
    console.log(userData);
    return this.http
      .post(this.heroesUrl + "signup", JSON.stringify(userData), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  checkUserName(userName: string) {
    return this.http
      .get(this.heroesUrl + "checkUserName?username=" + userName, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

}

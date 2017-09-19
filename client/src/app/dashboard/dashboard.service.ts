import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DashboardService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'http://localhost:3000/user/logout';  // URL to web api
  handleError;

  constructor(private http: Http) {
  }

  logout() {
    return this.http
      .get(this.heroesUrl, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

}

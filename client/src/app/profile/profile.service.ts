import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProfileService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private apiURL = 'http://localhost:3000/user/';  // URL to web api
  handleError;

  constructor(private http: Http) {
  }

  getProfile() {
    return this.http
      .get(this.apiURL + "getProfile", {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  editProfile(userData: object) {
    return this.http
      .put(this.apiURL + "editProfile", JSON.stringify(userData), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  uploadPhoto(imageData: object) {
    console.log(imageData);
    return this.http
      .post(this.apiURL + "uploadPhoto", JSON.stringify(imageData), {
        headers: new Headers({
          'Content-Type': 'multipart/form-data',
          'boundary': 'l3iPy71otz'
        })
      })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
}

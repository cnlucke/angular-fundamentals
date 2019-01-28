import {Injectable} from '@angular/core';
import {IUser} from './user.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, first, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  currentUser: IUser;

  loginUser(userName: string, password: string) {
    let loginInfo = {username: 'johnpapa', password};
    let options = {headers: new HttpHeaders({'ContentType': 'application/json'})};
    return this.http.post('/api/login', loginInfo, options)
      .pipe(tap(data => {
        this.currentUser = <IUser>data['user'];
      }))
      .pipe(catchError(err => {
        return of(false)
      }))
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
    this.currentUser['userName'] = (firstName + lastName).toLocaleLowerCase();

    let options = {headers: new HttpHeaders({'ContentType': 'application/json'})};
    return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    this.http.get('/api/currentIdentity')
      .pipe(tap(data => {
        if (data instanceof Object) {
          this.currentUser = <IUser> data;
        }
      }))
      .subscribe();
  }

  logout() {
    this.currentUser = undefined;

    let options = {headers: new HttpHeaders({'ContentType': 'application/json'})};
    return this.http.post('/api/logout', {}, options);
  }
}

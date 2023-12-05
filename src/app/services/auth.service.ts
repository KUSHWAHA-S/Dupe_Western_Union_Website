import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: boolean = false;
  constructor( public route: Router) { }

  logOut(){
    this.loggedIn=false;
    localStorage.setItem("loggedIn", JSON.stringify(this.loggedIn));
    this.route.navigate(['/login']);
  }
  isLoggedIn() {
    return this.loggedIn;
  }

  login(value: any):Observable<any> {
    if (value.email === "shalini@abc.com" && value.password === "123") {
      this.loggedIn = true;
      localStorage.setItem("loggedIn", JSON.stringify(this.loggedIn));
      return of({name:'shalini', email:'shalini@abc.com'})
    }
    return throwError(new Error('Failed to Login'));
  }
}

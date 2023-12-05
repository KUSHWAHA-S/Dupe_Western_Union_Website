import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public route: Router, private auth: AuthService) { }

  ngOnInit(): void {

    // if already loggedin then redirect to home page

    // console.log(this.auth.isLoggedIn());
    // if (this.auth.isLoggedIn()) {  
    //   this.route.navigate(['/myReceiver']);
    // } 
    

  }
  onSubmit(data: any) {
    // if form valid
    // console.log(data);
    
    // call auth service to check credentials
    this.auth.login(data).subscribe(
      (result) => {
        this.route.navigate(['/myReceiver']);
      },
      (err: Error) => {
        alert("Wrong credentials");
        // console.log("Wrong credentials");
      }
    );

  }
}

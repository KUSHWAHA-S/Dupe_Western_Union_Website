import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  changeHeader: boolean = true;
  changeHeaderLogOut: boolean = true;
  constructor(public route: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      // to check if url is not undefined
      if (val.url) {
        if(val.url==='/login'){
          this.changeHeaderLogOut=true;
        }
        else{
          this.changeHeaderLogOut=false;
        }
        if (val.url === '/addReceiver' || val.url === '/myReceiver' || val.url==='/editReceiver' || val.url==='/sendMoney') {
          this.changeHeader = true;
          // console.log(val.url);
          // console.log(this.changeHeader);
        } else {
          this.changeHeader = false;
          // console.log(val.url);
          // console.log(this.changeHeader);
        }
      }

    })
  }

  logOut() {
    this.auth.logOut();
  }

}

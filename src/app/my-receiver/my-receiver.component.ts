import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AddReceiverComponent } from '../add-receiver/add-receiver.component';
import { HttpClient } from '@angular/common/http';
import { AddReceiverService } from '../services/receiver.service';

@Component({
  selector: 'app-my-receiver',
  templateUrl: './my-receiver.component.html',
  styleUrls: ['./my-receiver.component.css']
})
export class MyReceiverComponent implements OnInit {

  receiverArray: Array<Object> = [{ name: "Jhon Doe" }, { name: "Rani" }, { name: "Jack" }];


  constructor(private http: HttpClient, private auth: AuthService, public route: Router, private receiver: AddReceiverService) {
    this.receiverArray = receiver.receiverData;
  }

  ngOnInit(): void {
    this.receiver.getReceiverData().subscribe(
      (res: any) => {
        // console.log(res);
        this.receiverArray = res;
      },
      (err:Error)=>{
        alert("400 error");
      }
    )
    // console.log(this.auth.loggedIn);
  }
  ngDoCheck(): void {
    // console.log(this.receiverArray);
  }
  addReceiver() {
    this.route.navigate(['/addReceiver'])
  }
  deleteReceiver(id: number) {
    // console.log(id);
    this.receiver.deleteReceiver(id).subscribe(
      (res: any) => {
        // console.log(res);
        this.route.navigate(['/myReceiver'])
        // this.receiverArray = res;
      },
      (err:Error)=>{
        alert("unable to delete , facing some problem");
      }
    )
  }
  editReceiver(id: number) {
    // console.log(id);
    let newId : string =id.toString();
    this.route.navigate(['/editReceiver'],{ queryParams: { id:newId } });
  }

}

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
  countryData: any;
  currentCountry: any;
  newReceiverArray: void;


  constructor(private http: HttpClient, private auth: AuthService, public route: Router, private receiver: AddReceiverService) {
    this.receiverArray = receiver.receiverData;
  }

  ngOnInit(): void {

    this.receiver.getReceiverData().subscribe(
      (res: any) => {
        this.receiverArray = res;
        console.log(this.receiverArray);
      },
      (err: Error) => {
        alert("400 error");
      }
    );

    this.receiver.getCountryData().subscribe(
      (response: any) => {
        this.countryData = response;
        console.log(this.countryData);
        console.log(this.receiverArray);
        this.receiverArray.forEach((r:any,index:number)=>{
          this.currentCountry = this.countryData.find((e: any) => {
          return e.name === r.country;
        }
        );
        console.log(this.currentCountry);
        console.log(r);
        this.receiverArray[index]={url:this.currentCountry.url, ...r};
        });
        console.log(this.receiverArray);
      },
      (err: Error) => {
        console.log(err);
      }
    );

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
      (err: Error) => {
        alert("unable to delete , facing some problem");
      }
    )
  }
  editReceiver(id: number) {
    // console.log(id);
    let newId: string = id.toString();
    this.route.navigate(['/editReceiver'], { queryParams: { id: newId } });
  }

}

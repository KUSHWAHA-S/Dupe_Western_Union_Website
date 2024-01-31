import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddReceiverService } from '../services/receiver.service';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.css']
})
export class SendMoneyComponent implements OnInit {

  countryData: any;
  filteredCountry: any;
  countrySelected: string;
  urlSelected: string;
  showCountry: boolean = false;
  forexData: any;
  senderCode: string = "USD";
  receiverCode: string = "INR";
  forexSelected: any;
  forexValue: any = 83.3348;
  sendAmount: any = 100;
  receiveAmount: any = this.sendAmount * this.forexValue;
  selectedPayout: string;
  data: any;

  constructor(private route: Router, private receiver: AddReceiverService) {

  }

  ngOnInit(): void {
    this.receiver.getCountryData().subscribe(
      (res: any) => {
        this.countryData = res;
        this.countrySelected = res[0].name;
        this.urlSelected = res[0].url;
        console.log(this.countryData);
      },
      (err: Error) => {
        console.log(err);
      }
    );
    this.receiver.getForexData().subscribe(
      (res: any) => {
        this.forexData = res;
        console.log(res);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }


  payoutMethod(method: string) {
    this.selectedPayout = method;
    console.log(method);
  }

  filter(data: string) {
    this.showCountry = true;
    this.countrySelected = data;
    console.log(data);
    this.filteredCountry = data === "" ? this.countryData : this.countryData.filter((c: any) => {
      return c.name.toLowerCase().includes(data.toLowerCase());
    });
  }
  countryChange(country: any) {
    this.showCountry = false;
    this.countrySelected = country?.name;
    this.urlSelected = country?.url;
    if (this.countrySelected) {

      this.forexSelected = this.forexData.filter((c: any) => {
        return c.receiverCountry.toLowerCase() == this.countrySelected.toLowerCase() && c.senderCountry.toLowerCase() == "usa";
      });
      console.log(this.forexSelected);
      if(this.forexSelected){
      this.forexValue = this.forexSelected[0].forexValue;
      this.receiverCode = this.forexSelected[0].receiverCode;}
      if (this.sendAmount) {
        this.receiveAmount = this.sendAmount * this.forexValue;
      }
      else {
        this.receiveAmount = 0;
      }
      console.log(this.forexValue);
    }
  }
  sendAmountChange(amount: any) {
    console.log(amount);
    this.sendAmount = amount;
    // this.forexValue = this.forexSelected[0].forexValue;
    // this.receiverCode = this.forexSelected[0].receiverCode;
    this.receiveAmount = amount * this.forexValue;
  }
  receiveAmountChange(amount: any) {
    let receiverCountry = this.forexData.filter((c: any) => {
      return c.senderCountry.toLowerCase() == this.countrySelected.toLowerCase() && c.receiverCountry.toLowerCase() == "usa";
    });
    this.sendAmount = amount * receiverCountry[0].forexValue;
  }
  onContinue() {

    if (this.selectedPayout && this.countrySelected) {
      this.data = {
        country: this.countrySelected,
        method: this.selectedPayout,
        sendAmount: this.sendAmount,
        receiveAmount: this.receiveAmount
      }
      localStorage.setItem("data", JSON.stringify(this.data));
      var d = localStorage.getItem("data");
      console.log(JSON.parse(d));
      this.route.navigate(['/receiverDetails']);
    }
    else {
      alert("Please select payout method or country");
    }
  }
  ngOnChange(): void {
    this.showCountry = true;
    // console.log("trfk");
  }
}

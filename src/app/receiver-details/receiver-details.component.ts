import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddReceiverService } from '../services/receiver.service';

@Component({
  selector: 'app-receiver-details',
  templateUrl: './receiver-details.component.html',
  styleUrls: ['./receiver-details.component.css']
})
export class ReceiverDetailsComponent implements OnInit {
  countryData: any;
  method: string;
  sendMoneyData: any;
  currentCountryCode: any;
  formStructure: any;
  dynamicForm!: FormGroup;
  walletOptions:Array<string>=["Google Pay", "Crypto", "PayPal"];
  bankOptions:Array<string>=["SBI", "HDFC", "AXIS"];

  constructor(private route: Router, private http: HttpClient, private formBuilder: FormBuilder, private receiver: AddReceiverService) {

  }

  ngOnInit(): void {
    // console.log(this.formStructure.getFormStructure());
    this.sendMoneyData = JSON.parse(localStorage.getItem("data"));
    this.method = this.sendMoneyData.method;
    console.log(this.method);
    console.log(this.sendMoneyData);

    this.receiver.getCountryData().subscribe(
      (res: any) => {

        this.countryData = res.find((e: any) => {
          return e.name === this.sendMoneyData.country;
        }
        );
        this.formStructure = this.countryData.fields;
        console.log(this.countryData);

        console.log(this.formStructure);
        let formGroup: { [key: string]: any } = { country: this.countryData.name };
        this.formStructure.forEach((field: any, index: number) => {
          
            if (field.required) {
              formGroup[field.name] = [field.value || '', [Validators.required]];
            }
            else {
              formGroup[field.name] = [field.value || ''];
            }
          
          

        });

        if (this.method === 'cash') {
          formGroup["streetAddress"] = ['', [Validators.required]];
          formGroup["AddressLine2"] = [''];
          formGroup["City"] = ['', [Validators.required]];
          formGroup["State"] = ['', [Validators.required]];
          formGroup["PostalCode"] = ['', [Validators.required]];
        }

        else if (this.method === 'bank') {
          formGroup["AccountNumber"] = ['', [Validators.required]];
          formGroup["BankName"] = ['', [Validators.required]];
        }
        else if (this.method === 'wallet') {
          formGroup["ServiceProvider"] = ['', [Validators.required]];
          formGroup["WalletMobileNumber"] = ['', [Validators.required]];
        }
        this.dynamicForm = this.formBuilder.group(formGroup);



      },
      (err: Error) => {
        console.log(err);
      }
    );

  }

  onSubmit(){
    localStorage.removeItem("data");
  }

  ngDoCheck(): void {
    console.log(this.dynamicForm);

  }
  onCancel(){
    this.route.navigate(['/sendMoney']);
  }

}

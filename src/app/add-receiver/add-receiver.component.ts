import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import receiverData from '../../assets/inputs/receiverData.json';
import { AddReceiverService } from '../services/receiver.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-receiver',
  templateUrl: './add-receiver.component.html',
  styleUrls: ['./add-receiver.component.css']
})


export class AddReceiverComponent implements OnInit {

  receiverData: Array<Object>;
  countryData: Array<Object>;
  currentCountryCode: any;
  code: any
  text: string = null;
  dynamicForm!: FormGroup;
  formStructure: any;
  valid: boolean = true;
  // @Input() name
  constructor(private route: Router, private http: HttpClient, private formBuilder: FormBuilder, private receiver: AddReceiverService) { }

  ngOnInit(): void {
    // console.log(this.formStructure.getFormStructure());
    this.receiver.getCountryData().subscribe(
      (res: any) => {
        this.countryData = res;
        console.log(this.countryData);
      },
      (err: Error) => {
        console.log(err);
      }
    )
  }
  ngDoCheck(): void {
    console.log(this.currentCountryCode);

  }
  onSubmit() {
    console.log(this.dynamicForm.value);
    if (this.dynamicForm.valid) {
      this.valid = false;
      this.receiver.postReceiverData(this.dynamicForm.value)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.route.navigate(['/myReceiver']);
          },
          (err: Error) => {
            console.log(err);
          }
        );
    } else {
      alert('Please fill all the credentials');
      this.valid = true;
    }

  }
  change(event: any) {
    console.log(event.target.value);
    if (this.currentCountryCode = this.countryData.find((e: any) => {
      return e.name === event.target.value;
    }
    )) {
      // this.currentCountryCode =obj.code
      this.code = this.currentCountryCode.code
      console.log(this.currentCountryCode);

      this.formStructure = this.currentCountryCode.fields;
      // console.log(formStructure);
      let formGroup: { [key: string]: any } = { country: this.currentCountryCode.name };
      this.formStructure.forEach((field: any) => {
        if (field.required) {
          formGroup[field.name] = [field.value || '', [Validators.required]];
        }
        else {
          formGroup[field.name] = [field.value || ''];
        }

      });
      this.dynamicForm = this.formBuilder.group(formGroup);
    }
  }
  errorMessage(field: any) {
    const formControl = this.dynamicForm.get(field.name);
    if (formControl?.hasError('required')) {
      return '*required field!';
    }
    else {
      return "ok";
    }
  }
  onCancel() {
    this.route.navigate(['/myReceiver']);
  }
}

// let obj = {
//   "firstName": data.firstName,
//   "lastName": data.lastName,
//   "email": data.email,
//   "phone": data.phone
// }
// this.http.get('assets/inputs/receiverData.json')
//   .subscribe(
//     (res: any) => {
//       switch (data.country) {
//         case 'india': res.india.push(obj); break;
//         case 'usa': res.usa.push(obj); break;
//         case 'uk': res.uk.push(obj); break;
//         default: console.log("error");
//       }
//       this.receiverData = res.india;
//       console.log(this.receiverData);


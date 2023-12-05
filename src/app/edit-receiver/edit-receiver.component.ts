import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddReceiverService } from '../services/receiver.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-receiver',
  templateUrl: './edit-receiver.component.html',
  styleUrls: ['./edit-receiver.component.css']
})
export class EditReceiverComponent implements OnInit {

  defaultValue: any = {};
  dynamicFields: Array<Object>;
  putId: number;
  countryCode: number;
  formStructure: any;
  dynamicForm!: FormGroup;
  valid: boolean = true;
  constructor(public router: ActivatedRoute, public route: Router,private formBuilder: FormBuilder, private http: HttpClient, public receiver: AddReceiverService) { }

  ngOnInit(): void {
    this.router.queryParams
      .subscribe(params => {
        // console.log(params.id); // { order: "popular" }
        this.putId = Number(params.id);
        this.receiver.getReceiverDataById(params.id).subscribe(
          (res: any) => {
            this.defaultValue = res;
            // console.log(this.defaultValue.firstName);
            this.receiver.getCountryData().subscribe((res: any) => {
              // console.log(res);
              let country = res.find((e: any) => {
                return e.name === this.defaultValue.country;
              }
              );
              this.dynamicFields = country.fields;
              this.countryCode = country.code;
              // console.log(country.fields);

              this.formStructure = this.dynamicFields;
              // console.log(this.formStructure);
              // console.log(this.defaultValue);
              let formGroup: { [key: string]: any } = this.defaultValue;
             
              this.dynamicForm = this.formBuilder.group(formGroup);
              // console.log(this.dynamicForm);
              this.formStructure.forEach((field: any) => {               
                if (field.required) {
                  this.dynamicForm.controls[field.name].setValidators([Validators.required])
                }

              });
            },
              (err: Error) => {
                console.log(err);
              })
          },
          (err: Error) => {
            console.log(err);
          }
        );
      },
        (err: Error) => {
          console.log(err);
        }
      );
  }
  onSubmit() {
    // {firstName}=data;
    // console.log(this.dynamicForm.valid);
    if (this.dynamicForm.valid) {
      this.valid = false;
      this.receiver.putReceiverData(this.dynamicForm.value, this.putId)
      .subscribe(
        (res: any) => {
          // console.log(res);
          this.route.navigate(['/myReceiver']);
        },
        (err: Error) => {
          console.log(err);
        }
      );
    }else {
      alert('Please fill all the credentials');
      this.valid = true;
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
  ngDoCheck(): void {
    // console.log('trf');

  }

}


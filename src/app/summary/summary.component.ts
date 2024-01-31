import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  receiverData: any=JSON.parse(localStorage.getItem("receiver-data"));
  todayDate: string;
  total: number;


  constructor() { }

  ngOnInit(): void {
    // this.receiverData = JSON.parse(localStorage.getItem("receiver-data"));
    console.log(this.receiverData);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.todayDate = mm + '/' + dd + '/' + yyyy;
    this.total = Number(this.receiverData.sendAmount) + 3.24;
  }



}

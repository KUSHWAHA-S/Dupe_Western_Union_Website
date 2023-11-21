import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddReceiverService {
  receiverData: Array<Object>;
  countryData: Array<Object>;
  constructor(private http: HttpClient) { }

  getCountryData() {
    return this.http.get('http://localhost:3000/countryData');
  }
  getCountryDataByCountry(id:string){
    return this.http.get('http://localhost:3000/countryData/India');
  }
  getReceiverData(){
    return this.http.get('http://localhost:3000/receiverData');
  }
  getReceiverDataById(id:string){
    return this.http.get('http://localhost:3000/receiverData/'+id);
  }
  putReceiverData(data:any,id:number){
    return this.http.put('http://localhost:3000/receiverData/'+id, data);
  }
  postReceiverData(data:any){
    return this.http.post('http://localhost:3000/receiverData', data);
  }
  deleteReceiver(id:number){
    return this.http.delete('http://localhost:3000/receiverData/'+id);
  }
  
}

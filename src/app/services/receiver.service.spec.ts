import { TestBed } from '@angular/core/testing';

import { AddReceiverService } from './receiver.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AddReceiverService', () => {
  let service: AddReceiverService;
  let httpClient:HttpClient;
  let httpTestControl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AddReceiverService]
    });
    service = TestBed.inject(AddReceiverService);
    httpTestControl= TestBed.inject(HttpTestingController);
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('http get method', () => {
    const mockReceiverData:Array<Object> = [{ id: 1, name: 'Receiver A' }, { id: 2, name: 'Receiver B' }];
    service.getReceiverData().subscribe((p)=>{
      expect(p).toEqual(mockReceiverData);
    });
    const req= httpTestControl.expectOne('http://localhost:3000/receiverData');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toEqual('json');
  });

  it('http get method', () => {
    const mockReceiverData:Array<Object> = [{ id: 1, name: 'Receiver A' }, { id: 2, name: 'Receiver B' }];
    service.getCountryData().subscribe((p)=>{
      expect(p).toEqual(mockReceiverData);
    });
    const req= httpTestControl.expectOne('http://localhost:3000/countryData');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toEqual('json');
  });
  
  it('http get receiver by id method', () => {
    const mockReceiverData:Array<Object> = [{ id: 1, name: 'Receiver A' }, { id: 2, name: 'Receiver B' }];
    const id: string='1';
    service.getReceiverDataById(id).subscribe((p)=>{
      expect(p).toEqual(mockReceiverData);
    });
    const req= httpTestControl.expectOne('http://localhost:3000/receiverData/'+id);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toEqual('json');
  });

  it('http post method', () => {
    const mockReceiverData:Array<Object> = [{ id: 1, name: 'Receiver A' }, { id: 2, name: 'Receiver B' }];
    service.postReceiverData(mockReceiverData).subscribe((p:any)=>{
      expect(p).toEqual(mockReceiverData);
    });
    const req= httpTestControl.expectOne('http://localhost:3000/receiverData');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toBe('POST');
    expect(req.request.responseType).toEqual('json');
  });
 
  it('http put method', () => {
    const mockReceiverData:Array<Object> = [{ id: 1, name: 'Receiver A' }, { id: 2, name: 'Receiver B' }];
    const id: number=1;
    service.putReceiverData(mockReceiverData,id).subscribe((p:any)=>{
      expect(p).toEqual(mockReceiverData);
    });
    const req= httpTestControl.expectOne('http://localhost:3000/receiverData/'+id);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toBe('PUT');
    expect(req.request.responseType).toEqual('json');
  });

  
  it('http delete receiver by id method', () => {
    const mockReceiverData:Array<Object> = [{ id: 1, name: 'Receiver A' }, { id: 2, name: 'Receiver B' }];
    const id:number=1;
    service.deleteReceiver(id).subscribe((p)=>{
      expect(p).toEqual(mockReceiverData);
    });
    const req= httpTestControl.expectOne('http://localhost:3000/receiverData/'+id);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toBe('DELETE');
    expect(req.request.responseType).toEqual('json');
  });

  afterEach(()=>{
    httpTestControl.verify();
  })

});

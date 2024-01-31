import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SendMoneyComponent } from './send-money.component';
import { AddReceiverService } from '../services/receiver.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('SendMoneyComponent', () => {
  let component: SendMoneyComponent;
  let fixture: ComponentFixture<SendMoneyComponent>;
  let addReceiverServiceSpy: jasmine.SpyObj<AddReceiverService>;
 
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AddReceiverService', ['getCountryData', 'getForexData']);
 
    TestBed.configureTestingModule({
      declarations: [SendMoneyComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: AddReceiverService, useValue: spy }
      ],
    });
 
    fixture = TestBed.createComponent(SendMoneyComponent);
    component = fixture.componentInstance;
    addReceiverServiceSpy = TestBed.inject(AddReceiverService) as jasmine.SpyObj<AddReceiverService>;
  });
 
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
 
  it('should call getCountryData and getForexData on ngOnInit', () => {
    const countryData = [{ name: 'Country1', url: 'URL1' }];
    const forexData = [{ senderCountry: 'USA', receiverCountry: 'INR', forexValue: 83.3348 }];
 
    addReceiverServiceSpy.getCountryData.and.returnValue(of(countryData)); //instructs spy to return observable with specified mockdata, and to specify when getcountry method should be called
    addReceiverServiceSpy.getForexData.and.returnValue(of(forexData));
//  of (operator) emits a specific value
    component.ngOnInit();
 
    expect(addReceiverServiceSpy.getCountryData).toHaveBeenCalled();
    expect(addReceiverServiceSpy.getForexData).toHaveBeenCalled();
    expect(component.countryData).toEqual(countryData);
    expect(component.forexData).toEqual(forexData);
  });
 
  it('should update filteredCountry array on filter method', () => {
    const countryData = [{ name: 'Country1', url: 'URL1' }, { name: 'Country2', url: 'URL2' }];
 
    component.countryData = countryData;
    component.filter('Country1');
 
    expect(component.showCountry).toBe(true);
    expect(component.filteredCountry).toEqual([{ name: 'Country1', url: 'URL1' }]);
  });
 
  it('should update properties on countryChange method', () => {
    const country = { name: 'Country1', url: 'URL1' };
    const forexSelected = [{ senderCountry: 'USA', receiverCountry: 'INR', forexValue: 83.3348 }];
 
    component.forexData = [{ senderCountry: 'USA', receiverCountry: 'INR', forexValue: 83.3348 }];
    component.countryChange(country);
 
    expect(component.showCountry).toBe(false);
    expect(component.countrySelected).toBe('Country1');
    expect(component.urlSelected).toBe('URL1');
    // expect(component.forexValue).toBe(forexSelected[0].forexValue);
    expect(console.log).toHaveBeenCalledWith('INR');
  });
 
  it('should update sendAmount on sendAmountChange method', () => {
   
    component.sendAmountChange(200);
    expect(component.sendAmount).toBe(200);
  });
 
  it('should update receiveAmount on receiveAmountChange method', () => {
    const forexSelected = [{ senderCountry: 'USA', receiverCountry: 'INR', forexValue: 83.3348 }];
    component.forexData = forexSelected;
    component.countryChange({name:'India',url:'IN'});  //to stimulate country change
    component.receiveAmountChange(100);
 
    expect(component.receiveAmount).toBe(100 * 83.3348);
  });
 
});

// describe('SendMoneyComponent', () => {
//   let component: SendMoneyComponent;
//   let fixture: ComponentFixture<SendMoneyComponent>;
//   let mockReceiverService: jasmine.SpyObj<AddReceiverService>;

//   beforeEach(() => {
//     mockReceiverService = jasmine.createSpyObj('AddReceiverService', ['getCountryData', 'getForexData']);

//     TestBed.configureTestingModule({
//       declarations: [SendMoneyComponent],
//       imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule],
//       providers: [{ provide: AddReceiverService, useValue: mockReceiverService }],
//     })
//       .compileComponents();
//   });

//   beforeEach(() => {

//     fixture = TestBed.createComponent(SendMoneyComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//     expect(component.countrySelected).toBeUndefined;
//     expect(component.urlSelected).toBeUndefined;
//     expect(component.countryData).toBeUndefined;
//     expect(component.forexData).toBeUndefined;
//     expect(component.forexValue).toEqual(83.3348);
//   });

//   it('should handle country selection', fakeAsync(() => {
//     const mockCountryData = [{ name: 'USA', url: 'usa-url' }];
//     mockReceiverService.getCountryData.and.returnValue(of(mockCountryData));

//     component.ngOnInit();
//     tick();

//     expect(component.countryData).toEqual(mockCountryData);
//     // expect(component.countrySelected).toEqual(mockCountryData[0].name);
//     // expect(component.urlSelected).toEqual('usa-url');
//   }));
//   it('should handle forex data retrieval', fakeAsync(() => {
//     const mockForexData = [{ senderCountry: 'USD', receiverCountry: 'INR', forexValue: 83.3348 }];
//     mockReceiverService.getForexData.and.returnValue(of(mockForexData));

//     component.ngOnInit();
//     tick();
//     expect(component.forexData).toEqual(mockForexData);
//   }));
//   it('should update forex data and calculate receiveAmount on country change', () => {
//     const mockCountry = { name: 'India', url: 'india-url' };
//     component.countryData = [{ senderCountry: 'USD', receiverCountry: 'INR', forexValue: 83.3348 }];
//     component.forexData = component.countryData;
 
//     component.countryChange(mockCountry);
 
//     expect(component.showCountry).toBe(false);
//     expect(component.countrySelected).toEqual('India');
//     expect(component.urlSelected).toEqual('india-url');
//     expect(component.forexSelected).toEqual(component.countryData);
    
//     expect(component.receiverCode).toEqual('INR');
    
//   });
// });
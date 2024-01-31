import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MyReceiverComponent } from './my-receiver.component';
import { AuthService } from '../services/auth.service';
import { AddReceiverComponent } from '../add-receiver/add-receiver.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddReceiverService } from '../services/receiver.service';
import { of, throwError } from 'rxjs';

describe('MyReceiverComponent', () => {
  let component: MyReceiverComponent;
  let fixture: ComponentFixture<MyReceiverComponent>;
  let authService: AuthService;
  let receiverService: AddReceiverService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReceiverComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule], 
      providers:[AuthService,AddReceiverComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    receiverService = TestBed.inject(AddReceiverService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize receiverArray with data from receiver service', () => {
    spyOn(receiverService, 'getReceiverData').and.returnValue(of([{ name: 'John Doe' }, { name: 'Rani' }, { name: 'Jack' }]));
 
    component.ngOnInit();
 
    expect(receiverService.getReceiverData).toHaveBeenCalled();
    expect(component.receiverArray).toEqual([{ name: 'John Doe' }, { name: 'Rani' }, { name: 'Jack' }]);
  });

  it('should show alert on error when initializing receiverArray', () => {
    spyOn(receiverService, 'getReceiverData').and.returnValue(throwError(new Error('400 error')));
    spyOn(window, 'alert');
    component.ngOnInit();
 
    expect(receiverService.getReceiverData).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('400 error');
  });

  it('should navigate to /addReceiver on addReceiver() call', () => {
    spyOn(component.route, 'navigate');
    component.addReceiver();
    expect(component.route.navigate).toHaveBeenCalledWith(['/addReceiver']);
  });

  it('should navigate to /editReceiver with query params on editReceiver() call', () => {
    spyOn(component.route, 'navigate'); 
    component.editReceiver(123);
    expect(component.route.navigate).toHaveBeenCalledWith(['/editReceiver'], { queryParams: { id: '123' } });
  });

 

});

import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { EditReceiverComponent } from './edit-receiver.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AddReceiverService } from '../services/receiver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('EditReceiverComponent', () => {
  let component: EditReceiverComponent;
  let fixture: ComponentFixture<EditReceiverComponent>;
  let service: AddReceiverService;
  let route: ActivatedRoute;
  let router: Router;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditReceiverComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
      providers: [{ provide: ActivatedRoute, useValue: { queryParams: of({ id: 123 }) } },
      { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        AuthService, FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // service = TestBed.get(AddReceiverService);
    service = TestBed.inject(AddReceiverService);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should populate dynamicForm and formStructure on ngOnInit', () => {
    spyOn(route.queryParams, 'subscribe').and.callThrough();
    spyOn(service, 'getReceiverDataById').and.returnValue(of({}));
    spyOn(service, 'getCountryData').and.returnValue(of([{ fields: [{ name: 'field1' }] }]));
    spyOn(formBuilder, 'group').and.callThrough();

    component.ngOnInit();

    expect(route.queryParams.subscribe).toHaveBeenCalled();
    // expect(service.getReceiverDataById).toHaveBeenCalledWith('123');
    expect(service.getCountryData).toHaveBeenCalled();
    expect(formBuilder.group).toHaveBeenCalled();
    expect(component.formStructure).toEqual([{ name: 'field1' }]);
  });

  it('should handle errors on ngOnInit', () => {
    spyOn(console, 'log');
    spyOn(route.queryParams, 'subscribe').and.callThrough();
    spyOn(service, 'getReceiverDataById').and.returnValue(throwError(new Error('Some error')));
    spyOn(service, 'getCountryData').and.returnValue(throwError(new Error('Some error')));
 
    component.ngOnInit();
 
    expect(route.queryParams.subscribe).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(new Error('Some error'));
    expect(console.log).toHaveBeenCalledWith(new Error('Some error'));
  });

  // fit('should navigate to /myReceiver on onSubmit with valid form', () => {
  //   // spyOn(component.route, 'navigate');
  //   spyOn(component.receiver, 'putReceiverData').and.returnValue(of({}));
 
  //   component.onSubmit();
 
  //   // expect(component.route.navigate).toHaveBeenCalledWith(['/myReceiver']);
  // });
 
  it('ngOnInit method should be called', () => {
    expect(component.ngOnInit).toBeTruthy();
  });
  it('onCancel method should be called', () => {
    expect(component.onCancel).toBeTruthy();
  });
  it('variables should undefined', () => {
    expect(component.defaultValue).toBeTruthy();
  });
  it('interpolation test', () => {
    const defaultValue: HTMLElement = fixture.debugElement.nativeElement.querySelector('h2');
    fixture.detectChanges(); 
    expect(defaultValue.innerHTML).toEqual(component.defaultValue);   
  });

 
  // it('test if service instace is getting called by get method', () => {
  //   expect(service instanceof (AddReceiverService)).toBeTruthy();
  // });

  it('test if service instace is getting called by inject method', inject([AddReceiverService], (instanceService: AddReceiverService) => {
    expect(instanceService).toBeTruthy();    //for initialisation
    expect(instanceService instanceof (AddReceiverService)).toBeTruthy(); //instanceservice is type of AddReceiverService
  }));
});

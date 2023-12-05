import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceiverComponent } from './add-receiver.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

describe('AddReceiverComponent', () => {
  let component: AddReceiverComponent;
  let fixture: ComponentFixture<AddReceiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReceiverComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule, FormsModule], 
      providers:[AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

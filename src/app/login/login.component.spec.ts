import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
      providers: [AuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login and navigate to /myReceiver on successful login', fakeAsync(() => {
    spyOn(authService, 'login').and.returnValue(of({ name: 'user', email: 'user@example.com' }));
    spyOn(component.route, 'navigate');

    component.onSubmit({ email: 'user@example.com', password: 'password' });
    tick();

    expect(authService.login).toHaveBeenCalledWith({ email: 'user@example.com', password: 'password' });
    expect(component.route.navigate).toHaveBeenCalledWith(['/myReceiver']);
  }));

  it('should show an alert and log an error on login failure', fakeAsync(() => {
    spyOn(authService, 'login').and.returnValue(throwError(new Error('Failed to Login')));
    spyOn(window, 'alert');

    component.onSubmit({ email: 'invalid@example.com', password: 'wrongpassword' });
    tick();

    expect(authService.login).toHaveBeenCalledWith({ email: 'invalid@example.com', password: 'wrongpassword' });
    expect(window.alert).toHaveBeenCalledWith('Wrong credentials');
  }));
});

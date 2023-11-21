import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize loggedIn to false', () => {
    expect(service.isLoggedIn()).toBeFalsy();
  });

  it('should set loggedIn to false and navigate to /login on logout', () => {
    spyOn(service.route, 'navigate');
    service.logOut();
    expect(service.isLoggedIn()).toBeFalsy();
    expect(localStorage.getItem('loggedIn')).toBe('false');
    expect(service.route.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return true when isLoggedIn is called after successful login', () => {
    const loginValue = { email: 'shalini@abc.com', password: '123' };
    service.login(loginValue).subscribe(() => {
      expect(service.isLoggedIn()).toBeTruthy();
    });
  });
 
  it('should return error when login fails', () => {
    const loginValue = { email: 'wrong@abc.com', password: 'wrong' };
    service.login(loginValue).subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('Failed to Login');
      }
    );
  });
});

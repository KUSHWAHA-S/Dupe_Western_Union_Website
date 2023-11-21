import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [AuthService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // fixture.detectChanges();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize changeLeader and changeHeader to true by default', () => {
    // expect(component.changeHeader).toBeTruthy();
    expect(component.changeHeader).toBeTruthy();
  });


  it('should call authService.logout() when logout() is called', () => {
    spyOn(authService, 'logOut');
    component.logOut();
    expect(authService.logOut).toHaveBeenCalled();
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'saveToken']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, LoginComponent],  // Import LoginComponent instead of declaring it
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Ensure navigate returns a promise
    router.navigate.and.returnValue(Promise.resolve(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and navigate to home', () => {
    const token = 'dummyToken';
    //authService.login.and.returnValue(of(token); //TODO: Fix this test

    component.usernameOrEmail = 'testUser';
    component.password = 'testPassword';
    component.login();

    expect(authService.login).toHaveBeenCalledWith('testUser', 'testPassword');
    expect(authService.saveToken).toHaveBeenCalledWith(token);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle login failure', () => {
    const errorResponse = { status: 401, message: 'Unauthorized' };
    authService.login.and.returnValue(throwError(() => errorResponse));

    component.usernameOrEmail = 'testUser';
    component.password = 'testPassword';
    component.login();

    expect(authService.login).toHaveBeenCalledWith('testUser', 'testPassword');
    expect(component.password).toBe('testPassword');  // Ensure password is not cleared on error
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to register page', () => {
    component.navigateToRegister();

    expect(router.navigate).toHaveBeenCalledWith(['/auth/register']);
  });
});

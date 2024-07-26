import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    AlertComponent
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usernameOrEmail: string = '';
  password: string = '';
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.usernameOrEmail, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token); // Save the token
        this.alertType = 'success';
        this.alertMessage = 'Login successful!';
        this.router.navigate(['/home']).then(success => {
          if (!success) {
            console.error('Navigation has failed');
          } else {
            console.log('Login successful');
          }
        });
      },
      error: (error) => {
        this.alertType = 'error';
        this.alertMessage = this.getErrorMessage(error);
        console.error('Login failed', error);
      }
    });
  }

  getErrorMessage(error: any): string {
    if (error?.error?.message) {
      return error.error.message;
    } else if (error?.message) {
      return error.message;
    } else {
      return 'Login failed! Please check your credentials.';
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']).then(success => {
      if (!success) {
        console.error('Navigation to register has failed');
      }
    });
  }
}

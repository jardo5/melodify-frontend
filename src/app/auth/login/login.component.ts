import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
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
        this.alertMessage = error.error.error || 'Login failed! Please check your credentials.';
        console.error('Login failed', error);
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']).then(success => {
      if (!success) {
        console.error('Navigation to register has failed');
      }
    });
  }
}

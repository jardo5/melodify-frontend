import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent]
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
        this.authService.saveToken(response.token);
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

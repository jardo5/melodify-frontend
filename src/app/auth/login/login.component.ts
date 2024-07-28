import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usernameOrEmail: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  login(): void {
    this.authService.login(this.usernameOrEmail, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']);
        this.alertService.showAlert('You have been logged in', 'success');
      },
      error: (error) => {
        this.alertService.showAlert('There was an error logging in', 'error');
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']).then(success => {
      if (!success) {
        console.error('Navigation to register has failed');
      }
    });
  }
}

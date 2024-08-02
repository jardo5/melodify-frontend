import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpRequest} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router, private alert: AlertService) {}

  register(): void {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: user => {
        this.router.navigate(['/login']);
        this.alert.showAlert('You have been registered. Please Login', 'success');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Registration failed', error);
        const errorMessage = error.error?.error || 'There was an error registering';
        this.alert.showAlert(errorMessage, 'error');
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['auth/login']);
  }
}

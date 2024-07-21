import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { AuthService } from './app/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
      router.navigate(['/home']).then(success => {
        if (!success) {
          console.error('Navigation to home failed');
        }
      });
    } else {
      router.navigate(['/auth/login']).then(success => {
        if (!success) {
          console.error('Navigation to login failed');
        }
      });
    }
  })
  .catch(err => console.error(err));

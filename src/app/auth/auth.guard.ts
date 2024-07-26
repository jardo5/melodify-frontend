import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Auth Guard: Checking login status');

  if (authService.isLoggedIn()) {
    console.log('Auth Guard: User is logged in');
    return true;
  } else {
    console.log('Auth Guard: User is not logged in, redirecting to login');
    return router.navigate(['/auth/login']).then(success => {
      if (!success) {
        console.error('Navigation to login failed');
      }
      return false;
    });
  }
};

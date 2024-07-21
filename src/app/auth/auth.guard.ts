import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Auth Guard: Checking login status');

  if (authService.isLoggedIn()) {
    console.log('Auth Guard: User is logged in');
    return true;
  } else {
    console.log('Auth Guard: User is not logged in, redirecting to login');
    return router.navigate(['/auth/login']).then(() => false);
  }
};

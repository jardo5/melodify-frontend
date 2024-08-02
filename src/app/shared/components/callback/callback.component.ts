import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthConnectedAccount } from '../../../auth/auth.connectedaccount';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  standalone: true
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private connectedAccountService: AuthConnectedAccount
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit called in CallbackComponent');
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const state = params['state'];
      const token = localStorage.getItem('token');

      if (code && state && token) {
        this.connectedAccountService.handleSpotifyCallback(code, state, token).subscribe({
          next: (response: any) => {
            console.log('Spotify callback handled successfully:', response);
            this.router.navigate(['/settings']); // Navigate to settings page
          },
          error: (error: any) => {
            console.error('Error handling Spotify callback:', error);
            this.router.navigate(['/settings']); // Navigate to settings page even if there's an error
          }
        });
      } else {
        console.error('No code, state, or token found in callback URL');
        this.router.navigate(['/auth/login']); // Navigate to login page if parameters are missing
      }
    });
  }
}

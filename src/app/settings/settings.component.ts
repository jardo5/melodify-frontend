import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConnectedAccount } from '../auth/auth.connectedaccount';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  constructor(
    private router: Router,
    private connectedAccountService: AuthConnectedAccount
  ) {}

  loginWithSpotify() {
    this.connectedAccountService.loginWithSpotify().subscribe({
      next: (response: { authorizationUrl: string }) => {
        // Handle the redirection to Spotify's authorization URL
        window.location.href = response.authorizationUrl;
      },
      error: (error: any) => {
        console.error('Error during Spotify login:', error);
      }
    });
  }

  loginWithAppleMusic() {
    // Implement similar logic for Apple Music
  }

  loginWithSoundCloud() {
    // Implement similar logic for SoundCloud
  }

  navToPlaylists() {
    this.router.navigate(['/playlist']);
  }
}

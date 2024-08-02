import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthConnectedAccount } from '../auth/auth.connectedaccount';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    RouterLink,
    NgStyle
  ],
  standalone: true
})
export class SettingsComponent implements OnInit {
  user: User | null = null;

  constructor(
    private router: Router,
    private connectedAccountService: AuthConnectedAccount,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error: any) => {
        console.error('Error fetching user info:', error);
      },
    });
  }

  loginWithSpotify(): void {
    if (!this.isProviderDisabled('spotify')) {
      this.connectedAccountService.loginWithSpotify().subscribe({
        next: (response: { authorizationUrl: string }) => {
          window.location.href = response.authorizationUrl;
        },
        error: (error: any) => {
          console.error('Error during Spotify login:', error);
        },
      });
    }
  }

  getProviderIcon(provider: string): string {
    const providerIcons: { [key: string]: string } = {
      'Apple Music': 'applemusic.svg',
      'spotify': 'spotify.svg',
      'soundcloud': 'soundcloud.svg',
      'youtube': 'youtube.svg'
    };
    return `assets/providers/${providerIcons[provider] || 'default-provider.svg'}`;
  }

  getProviderColor(provider: string): string {
    const providerColors: { [key: string]: string } = {
      'Apple Music': '#fa243c',
      'spotify': '#1DB954',
      'soundcloud': '#ff8800',
      'youtube': '#FF0000'
    };
    return providerColors[provider] || '#000';
  }

  isProviderDisabled(provider: string): boolean {
    return !!this.user?.connectedAccounts.find(account => account.provider === provider);
  }
}

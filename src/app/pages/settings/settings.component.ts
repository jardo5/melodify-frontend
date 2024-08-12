import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthConnectedAccount } from '../../auth/auth.connectedaccount';
import { UserService } from '../../services/user.service';
import { SongService } from '../../services/song.service';
import { User } from '../../models/user.model';
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { SongsListComponent } from "../../shared/components/songs-list/songs-list.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    RouterLink,
    NgStyle,
    SongsListComponent
  ],
  standalone: true
})
export class SettingsComponent implements OnInit {
  user: User | null = null;
  likedSongs: { fullTitle: string, imageUrl: string, id: string }[] = [];
  dislikedSongs: { fullTitle: string, imageUrl: string, id: string }[] = [];
  showModal = false;
  isLoading = false;

  constructor(
    private router: Router,
    private connectedAccountService: AuthConnectedAccount,
    private userService: UserService,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next: (user: User | null) => {
        if (user) {
          this.user = user;
        } else {
          console.error('User info is null');
        }
      },
      error: (error: any) => {
        console.error('Error fetching user info:', error);
      },
    });
  }

  // For fetching liked and disliked songs
  private fetchSongs(songIds: string[], type: 'liked' | 'disliked'): void {
    this.isLoading = true;
    if (songIds.length > 0) {
      this.songService.getSongsByIds(songIds).subscribe({
        next: (songs) => {
          const songDetails = songs.map(song => ({
            fullTitle: song.fullTitle || 'Unknown Title',
            imageUrl: song.imageUrl || 'default-image-url',
            id: song.id
          }));
          if (type === 'liked') {
            this.likedSongs = songDetails;
          } else {
            this.dislikedSongs = songDetails;
          }
        },
        error: (error: any) => console.error('Error fetching songs:', error),
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
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

  // Method to show the modal and fetch songs
  viewLikeDislikeSongs(): void {
    if (this.user) {
      if (this.user.likedSongs.length > 0) {
        this.fetchSongs(this.user.likedSongs, 'liked');
      } else {
        this.likedSongs = []; // Ensure likedSongs is empty if there are no liked songs
      }

      if (this.user.dislikedSongs.length > 0) {
        this.fetchSongs(this.user.dislikedSongs, 'disliked');
      } else {
        this.dislikedSongs = []; // Ensure dislikedSongs is empty if there are no disliked songs
      }
    }
    this.showModal = true;
  }

  // Method to close the modal
  closeModal(): void {
    this.showModal = false;
  }
}

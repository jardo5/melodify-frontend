import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/ConnectedAccountsSerice/spotify.service';
import { Playlist } from '../models/playlist';
import {NgForOf, NgIf, NgStyle, SlicePipe} from "@angular/common";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    NgIf,
    SlicePipe
  ],
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlists: Playlist[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private spotifyService: SpotifyService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.getUserPlaylists();
    this.alertService.getAlert().subscribe(alert => {
      if (alert.type === 'error') {
        this.errorMessage = alert.message;
      } else if (alert.type === 'success') {
        this.successMessage = alert.message;
      }
    });
  }

  getUserPlaylists(): void {
    this.spotifyService.getUserSpotifyPlaylists().subscribe({
      next: (playlists: Playlist[]) => {
        this.playlists = playlists;
      },
      error: (err: any) => {
        this.errorMessage = err.message;
      }
    });
  }

  getProviderIcon(provider: string | undefined): string {
    const providerIcons: { [key: string]: string } = {
      'Spotify': 'spotify.svg',
      'AppleMusic': 'apple-music.svg',
      'Soundcloud': 'soundcloud.svg'
      // Add other providers as needed
    };
    if (!provider) {
      provider = 'default-provider';
    }
    return `assets/providers/${providerIcons[provider] || 'default-provider.svg'}`;
  }

  getProviderColor(provider: string | undefined): string {
    const providerColors: { [key: string]: string } = {
      'Spotify': '#1DB954',
      'AppleMusic': '#FA233B',
      'Soundcloud': '#FF5500'
      // Add other providers as needed
    };
    if (!provider) {
      provider = 'default-provider';
    }
    return providerColors[provider] || '#000';
  }
}

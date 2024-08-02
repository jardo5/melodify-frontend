import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/ConnectedAccountsSerice/spotify.service';
import { Playlist } from '../models/playlist';
import {NgForOf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle
  ],
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlists: Playlist[] = [];
  error: string | null = null;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getUserPlaylists();
  }

  getUserPlaylists(): void {
    this.spotifyService.getUserSpotifyPlaylists().subscribe({
      next: (playlists: Playlist[]) => {
        this.playlists = playlists;
      },
      error: (err: any) => {
        this.error = 'Failed to load playlists';
        console.error(err);
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

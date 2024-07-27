import { Component } from '@angular/core';
import { TopSongsComponent } from "../shared/components/top-songs/top-songs.component";
import { SearchComponent } from "../shared/components/search/search.component";
import { SongDetailsComponent } from "../shared/components/song-details/song-details.component";
import { NgIf } from "@angular/common";
import { ArtistDetailsComponent } from "../shared/components/artist-details/artist-details.component";
import { SongService } from "../services/song.service";
import { ArtistService } from "../services/artist.service";
import { Song } from "../models/music/song.model";
import {Artist} from "../models/music/artist.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopSongsComponent,
    SearchComponent,
    SongDetailsComponent,
    NgIf,
    ArtistDetailsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedSongId: string | null = null;
  selectedSong: Song | null = null;
  selectedArtist: Artist | null = null;
  selectedArtistId?: string;
  isLoading = false;

  constructor(private songService: SongService, private artistService: ArtistService) {}

  onSongSelected(songId: string): void {
    this.isLoading = true;
    this.selectedSongId = songId;
    this.selectedArtist = null;
    this.fetchSongDetails(songId);
  }

  fetchSongDetails(songId: string): void {
    this.songService.getSongById(songId).subscribe({
      next: (song) => {
        this.selectedSong = song;
        this.selectedArtistId = undefined;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching song details', err);
        this.isLoading = false;
      }
    });
  }

  onArtistSelected(artistId: string): void {
    this.isLoading = true;
    this.selectedArtistId = artistId;
    this.selectedSong = null;
    this.fetchArtistDetails(artistId);
  }
  fetchArtistDetails(artistId: string): void {
    this.artistService.getArtistById(artistId).subscribe({
      next: (response) => {
        this.selectedArtist = response.artist;
        this.selectedSongId = null;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching artist details', err);
        this.isLoading = false;
      }
    });
  }

  closeSongDetails(): void {
    this.selectedSong = null;
    this.selectedSongId = null;
  }

  closeArtistDetails(): void {
    this.selectedArtist = null;
    this.selectedArtistId = undefined;
  }
}

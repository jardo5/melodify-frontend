import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist } from '../../../models/music/artist.model';
import { Song } from '../../../models/music/song.model';
import { CommonModule, NgFor, NgIf, SlicePipe } from '@angular/common';
import { ArtistService } from '../../../services/artist.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  standalone: true,
  imports: [
    SlicePipe,
    NgIf,
    NgFor,
    CommonModule,
  ],
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent implements OnInit {
  @Input() artistId?: string;
  @Output() close = new EventEmitter<void>();
  @Output() songSelected = new EventEmitter<string>();

  artist?: Artist;
  topSongs: Song[] = [];
  isDescriptionExpanded = false;
  isLoading = false;

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    if (this.artistId) {
      this.fetchArtistDetails(this.artistId);
    }
  }

  fetchArtistDetails(artistId: string) {
    this.isLoading = true;
    this.artistService.getArtistById(artistId).subscribe({
      next: ({ artist, topSongs }) => {
        this.artist = artist;
        this.topSongs = topSongs;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        console.error('Error fetching artist details');
      }
    });
  }

  closeDetails() {
    this.close.emit();
  }

  toggleDescription() {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }

  getSocialMediaIcon(platform: string): string {
    const platformIcons: { [key: string]: string } = {
      'twitter': 'twitter.svg',
      'facebook': 'facebook.svg',
      'instagram': 'instagram.svg'
    };
    return `assets/socialmedia/${platformIcons[platform] || 'default-platform.svg'}`;
  }

  getSocialMediaColor(platform: string): string {
    const platformColors: { [key: string]: string } = {
      'twitter': '#1DA1F2',
      'facebook': '#3b5998',
      'instagram': '#C13584'
    };
    return platformColors[platform] || '#000';
  }

  viewSongDetails(songId: string): void {
    if (songId) {
      this.songSelected.emit(songId);
    }
  }
}

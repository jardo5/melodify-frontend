import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Song } from '../../../models/music/song.model';
import { DecimalPipe, NgForOf, NgIf, NgStyle, SlicePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  standalone: true,
  imports: [
    TitleCasePipe,
    SlicePipe,
    DecimalPipe,
    NgForOf,
    NgIf,
    NgStyle
  ],
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent {
  @Input() song?: Song;
  @Output() close = new EventEmitter<void>();
  @Output() viewArtist = new EventEmitter<string>();

  isDescriptionExpanded = false;
  isLyricsExpanded = false;

  closeDetails() {
    this.close.emit();
  }

  toggleDescription() {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }

  toggleLyrics() {
    this.isLyricsExpanded = !this.isLyricsExpanded;
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

  formatLyrics(lyrics: string | undefined): string {
    if (!lyrics) return 'Lyrics not available';
    return lyrics.split(/(\r\n|\n|\r)/g)
      .filter(line => line.trim() !== '') // Remove any empty lines
      .map(line => `<span class="flex my-0.5">${line}</span>`)
      .join('<br>');
  }

  viewArtistDetails(): void {
    if (this.song && this.song.primaryArtist && this.song.primaryArtist.id) {
      this.viewArtist.emit(this.song.primaryArtist.id);
    }
  }

  viewAlbumDetails() {
    // TODO: Implement this
  }
}

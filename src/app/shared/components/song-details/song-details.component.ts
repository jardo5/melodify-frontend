import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Song } from '../../../models/music/song.model';
import { DecimalPipe, NgClass, NgForOf, NgIf, NgStyle, SlicePipe, TitleCasePipe } from '@angular/common';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';

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
    NgStyle,
    NgClass
  ],
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {
  @Input() song?: Song;
  @Output() close = new EventEmitter<void>();
  @Output() viewArtist = new EventEmitter<string>();

  isDescriptionExpanded = false;
  isLyricsExpanded = false;
  user?: User;
  errorMessage: string = '';
  successMessage: string = '';
  isLiked: boolean = false;
  isDisliked: boolean = false;

  constructor(private userService: UserService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(user => {
      this.user = user;
      this.checkIfLikedOrDisliked();
    });

    this.alertService.getAlert().subscribe(alert => {
      if (alert.type === 'error') {
        this.errorMessage = alert.message;
      } else if (alert.type === 'success') {
        this.successMessage = alert.message;
      }
    });
  }

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

  likeSong(): void {
    if (this.user && this.song) {
      this.userService.likeSong(this.user.id, this.song.id).subscribe(
        response => {
          this.alertService.showAlert('Song liked successfully', 'success');
          this.isLiked = true;
          this.isDisliked = false;
          console.log('Song liked:', response);
        },
        error => {
          this.alertService.showAlert(error, 'error'); // Update this line
          console.error('Error liking song:', error);
        }
      );
    }
  }

  dislikeSong(): void {
    if (this.user && this.song) {
      this.userService.dislikeSong(this.user.id, this.song.id).subscribe(
        response => {
          this.alertService.showAlert('Song disliked successfully', 'success');
          this.isDisliked = true;
          this.isLiked = false;
          console.log('Song disliked:', response);
        },
        error => {
          this.alertService.showAlert(error, 'error'); // Update this line
          console.error('Error disliking song:', error);
        }
      );
    }
  }

  private checkIfLikedOrDisliked() {
    if (this.user && this.song) {
      this.isLiked = this.user.likedSongs.includes(this.song.id);
      this.isDisliked = this.user.dislikedSongs.includes(this.song.id);
    }
  }
}

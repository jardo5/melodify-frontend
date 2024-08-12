import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Song } from '../../../models/music/song.model';
import { DecimalPipe, NgClass, NgForOf, NgIf, NgStyle, SlicePipe, TitleCasePipe } from '@angular/common';
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
  errorMessage: string = '';
  successMessage: string = '';
  isLiked: boolean = false;
  isDisliked: boolean = false;
  isSaved: boolean = false;

  constructor(private userService: UserService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(user => {
      if (user && this.song) {
        this.isLiked = this.userService.isLiked(this.song.id);
        this.isDisliked = this.userService.isDisliked(this.song.id);
        this.isSaved = this.userService.isSaved(this.song.id);
      }
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
    this.userService.getUserInfo().subscribe(user => {
      if (user && this.song) {
        this.userService.likeSong(user.id, this.song.id).subscribe(() => {
          this.isLiked = true;
          this.isDisliked = false;
          this.alertService.showAlert('Song liked successfully', 'success');
        });
      }
    });
  }

  dislikeSong(): void {
    this.userService.getUserInfo().subscribe(user => {
      if (user && this.song) {
        this.userService.dislikeSong(user.id, this.song.id).subscribe(() => {
          this.isDisliked = true;
          this.isLiked = false;
          this.alertService.showAlert('Song disliked successfully', 'success');
        });
      }
    });
  }

  saveSong(): void {
    this.userService.getUserInfo().subscribe(user => {
      if (user && this.song) {
        this.userService.saveSong(user.id, this.song.id).subscribe(() => {
          this.isSaved = true;
          this.alertService.showAlert('Song saved successfully', 'success');
        });
      }
    });
  }
}

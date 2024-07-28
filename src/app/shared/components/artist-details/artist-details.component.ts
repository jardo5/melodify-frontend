import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist } from '../../../models/music/artist.model';
import { Song } from '../../../models/music/song.model';
import {NgForOf, NgIf, NgStyle, SlicePipe} from "@angular/common";
import {TopTrack} from "../../../models/top-track";

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    SlicePipe,
    NgForOf
  ],
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent {
  @Input() artist?: Artist;
  @Input() topSongs: Song[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() songSelected = new EventEmitter<string>();

  isLoading = false;

  isDescriptionExpanded = false;

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

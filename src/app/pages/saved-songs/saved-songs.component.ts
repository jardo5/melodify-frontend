import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { UserService } from '../../services/user.service';
import { Song } from '../../models/music/song.model';
import { User } from '../../models/user.model';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-saved-songs',
  standalone: true,
  imports: [NgForOf, NgIf, DecimalPipe],
  templateUrl: './saved-songs.component.html',
  styleUrls: ['./saved-songs.component.css']
})
export class SavedSongsComponent implements OnInit {
  user: User | null = null;
  savedSongs: Song[] = [];
  selectedSong: Song | null = null;
  isLoading = false;

  constructor(private songService: SongService, private userService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUserInfo().subscribe({
      next: (user: User) => {
        this.user = user;
        this.fetchSavedSongs(user.savedSongs);
      },
      error: (error: any) => {
        console.error('Error fetching user info:', error);
        this.isLoading = false;
      }
    });
  }

  private fetchSavedSongs(songIds: string[]): void {
    this.songService.getSongsByIds(songIds).subscribe({
      next: (songs) => {
        this.savedSongs = songs;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching songs:', error);
        this.isLoading = false;
      }
    });
  }

  openDeleteModal(song: Song) {
    this.selectedSong = song;
    const modal = document.getElementById('deleteSongModal') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  deleteSong() {
    if (this.selectedSong && this.user) {
      this.userService.removeSavedSong(this.user.id, this.selectedSong.id).subscribe({
        next: () => {
          this.savedSongs = this.savedSongs.filter(song => song.id !== this.selectedSong!.id);
        },
        error: (error) => console.error('Error removing saved song:', error)
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { UserService } from '../../services/user.service';
import { Song } from '../../models/music/song.model';
import { User } from '../../models/user.model';
import { DecimalPipe, NgForOf, NgIf } from '@angular/common';

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
    this.isLoading = true; // Start the loading state

    // Subscribe to user info updates
    this.userService.getUserInfo().subscribe({
      next: (user: User | null) => {
        if (user) {
          this.user = user;
          // Fetch the saved songs after successfully retrieving the user info
          this.fetchSavedSongs(user.savedSongs);
        } else {
          console.error('User info is null');
          this.isLoading = false; // Stop the loading state
        }
      },
      error: (error: any) => {
        console.error('Error fetching user info:', error);
        this.isLoading = false; // Stop the loading state
      }
    });
  }

  private fetchSavedSongs(songIds: string[]): void {
    if (songIds.length === 0) {
      this.isLoading = false; // Stop the loading state if there are no saved songs
      return;
    }

    this.songService.getSongsByIds(songIds).subscribe({
      next: (songs) => {
        this.savedSongs = songs;
        this.isLoading = false; // Stop the loading state after fetching songs
      },
      error: (error: any) => {
        console.error('Error fetching songs:', error);
        this.isLoading = false; // Stop the loading state on error
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
          this.userService.refreshUserInfo().subscribe((updatedUser) => {
            this.user = updatedUser;
            this.fetchSavedSongs(this.user.savedSongs); // Update saved songs list
          });
        },
        error: (error) => console.error('Error removing saved song:', error)
      });
    }
  }
}

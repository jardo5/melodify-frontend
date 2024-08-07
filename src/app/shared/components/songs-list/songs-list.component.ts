import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {
  @Input() likedSongs: { fullTitle: string, imageUrl: string, id: string }[] = [];
  @Input() dislikedSongs: { fullTitle: string, imageUrl: string, id: string }[] = [];
  @Input() userId: string | null = null;
  @Output() close = new EventEmitter<void>();

  selectedSong: { fullTitle: string, imageUrl: string, id: string } | null = null;
  selectedSongType: 'liked' | 'disliked' | null = null;
  isLoading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  closeModal() {
    this.close.emit();
  }

  openDeleteModal(song: { fullTitle: string, imageUrl: string, id: string }, type: 'liked' | 'disliked') {
    this.selectedSong = song;
    this.selectedSongType = type;
    const modal = document.getElementById('deleteSongModal') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  closeDeleteModal() {
    this.selectedSong = null;
    this.selectedSongType = null;
    const modal = document.getElementById('deleteSongModal') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }

  deleteSong() {
    if (this.selectedSong && this.selectedSongType && this.userId) {
      if (this.selectedSongType === 'liked') {
        this.userService.removeLikedSong(this.userId, this.selectedSong.id).subscribe({
          next: () => {
            this.likedSongs = this.likedSongs.filter(song => song.id !== this.selectedSong!.id);
            this.closeDeleteModal();
          },
          error: (error) => console.error('Error removing liked song:', error)
        });
      } else {
        this.userService.removeDislikedSong(this.userId, this.selectedSong.id).subscribe({
          next: () => {
            this.dislikedSongs = this.dislikedSongs.filter(song => song.id !== this.selectedSong!.id);
            this.closeDeleteModal();
          },
          error: (error) => console.error('Error removing disliked song:', error)
        });
      }
    }
  }
}

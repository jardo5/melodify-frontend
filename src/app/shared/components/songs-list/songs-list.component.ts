import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SongService } from '../../../services/song.service';
import { User } from '../../../models/user.model';
import {NgForOf, NgIf} from "@angular/common";

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
  @Input() likedSongs: { fullTitle: string, imageUrl: string }[] = [];
  @Input() dislikedSongs: { fullTitle: string, imageUrl: string }[] = [];
  @Output() close = new EventEmitter<void>();

  isLoading = false;

  ngOnInit(): void {}

  closeModal() {
    this.close.emit();
  }
}

import { Component } from '@angular/core';
import {TopSongsComponent} from "../shared/components/top-songs/top-songs.component";
import {SearchComponent} from "../shared/components/search/search.component";
import {SongDetailsComponent} from "../shared/components/song-details/song-details.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopSongsComponent,
    SearchComponent,
    SongDetailsComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedSong: any = null;

  onSongSelected(song: any) {
    this.selectedSong = song;
  }

  closeSongDetails() {
    this.selectedSong = null;
  }
}

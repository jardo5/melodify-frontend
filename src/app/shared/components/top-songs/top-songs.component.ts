import {Component, OnInit, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongService } from '../../../services/song.service';

@Component({
  selector: 'app-top-songs',
  templateUrl: './top-songs.component.html',
  styleUrls: ['./top-songs.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule]
})
export class TopSongsComponent implements OnInit {
  topSongs: any[] = [];

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.songService.getTopSongs().subscribe((data: any[]) => {
      this.topSongs = data;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../../services/recommendation.service';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/music/song.model';
import {NgForOf, NgIf} from "@angular/common";
import {SongDetailsComponent} from "../../shared/components/song-details/song-details.component";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SongDetailsComponent
  ],
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  recommendations: Song[] = [];
  offset = 0;
  limit = 10;
  noMoreRecommendations = false;
  selectedSong?: Song;
  isLoading = false;

  constructor(
    private recommendationService: RecommendationService,
    private songService: SongService
  ) { }

  ngOnInit(): void {
    this.loadRecommendations();
  }

  loadRecommendations(): void {
    this.isLoading = true;
    this.recommendationService.getRecommendations(this.offset, this.limit).subscribe(
      (songIds: string[]) => {
        if (songIds.length === 0) {
          this.noMoreRecommendations = true;
          if (this.recommendations.length === 0) {
            this.recommendations = []; // Ensure recommendations array is set to empty
          }
        } else {
          this.songService.getSongsByIds(songIds).subscribe(
            (songs: Song[]) => {
              this.recommendations = this.recommendations.concat(songs);
              if (songIds.length < this.limit) {
                this.noMoreRecommendations = true;
              }
            },
            error => console.error('Failed to load song details', error)
          );
        }
      },
      error => console.error('Failed to load recommendations', error)
    ).add(() => this.isLoading = false
    );
  }

  loadMoreRecommendations(): void {
    this.offset += this.limit;
    this.loadRecommendations();
  }

  openSongDetails(song: Song): void {
    this.selectedSong = song;
  }

  closeSongDetails(): void {
    this.selectedSong = undefined;
  }

  viewArtistDetails(artistId: string): void {
    // Implement the logic to view artist details
  }
}

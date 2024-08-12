import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../../services/recommendation.service';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/music/song.model';
import { NgForOf, NgIf } from "@angular/common";
import { SongDetailsComponent } from "../../shared/components/song-details/song-details.component";

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
    this.recommendationService.getRecommendations().subscribe(
      (songIds: string[]) => {
        if (songIds.length === 0) {
          this.noMoreRecommendations = true;
          this.recommendations = [];
        } else {
          this.songService.getSongsByIds(songIds).subscribe(
            (songs: Song[]) => {
              this.recommendations = songs;
              this.noMoreRecommendations = songIds.length < 20;
            },
            error => console.error('Failed to load song details', error)
          );
        }
      },
      error => console.error('Failed to load recommendations', error)
    ).add(() => this.isLoading = false);
  }

  refreshRecommendations(): void {
    this.isLoading = true;
    this.recommendationService.refreshRecommendations().subscribe(
      (songIds: string[]) => {
        this.songService.getSongsByIds(songIds).subscribe(
          (songs: Song[]) => {
            this.recommendations = songs;
            this.noMoreRecommendations = songIds.length < 20;
            this.isLoading = false;
          },
          error => console.error('Failed to load song details', error)
        );
      },
      error => console.error('Failed to refresh recommendations', error)
    );
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

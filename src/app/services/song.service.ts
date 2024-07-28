import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Song } from '../models/music/song.model';
import { map } from 'rxjs/operators';
import {SearchResult} from "../models/search-result";
import {TopTrack} from "../models/top-track";

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTopSongs(): Observable<TopTrack[]> {
    return this.http.get<TopTrack[]>(`${this.apiUrl}/songs/top`).pipe(
      map((data: any[]) => data.map(trackData => new TopTrack(trackData))),
      catchError(this.handleError)
    );
  }

  //TODO: Fix and make it so user has to click button to search and limit the number of searches per 30 seconds
  getSongByTitle(query: string): Observable<SearchResult[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<SearchResult[]>(`${this.apiUrl}/songs/search`, { headers, params: { query } }).pipe(
      map(data => data.map(item => new SearchResult(item)))
    );
  }

  getSongById(id: string): Observable<Song> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Song>(`${this.apiUrl}/songs/${id}`, { headers }).pipe(
      map(data => new Song(data)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error); // Log the error to the console
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}

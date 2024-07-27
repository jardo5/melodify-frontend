import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service'; // Make sure to import your AuthService
import { Artist } from '../models/music/artist.model';
import { Song } from '../models/music/song.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getArtistById(artistId: string): Observable<{ artist: Artist, topSongs: Song[] }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/artists/${artistId}`, { headers }).pipe(
      map(response => {
        const artist = Artist.fromJson(response.artist);
        const topSongs = response.topSongs.map((songData: any) => new Song(songData));
        return { artist, topSongs };
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}

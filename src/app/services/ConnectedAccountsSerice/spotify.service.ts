import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../../models/playlist';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserSpotifyPlaylists(): Observable<Playlist[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Playlist[]>(`${this.apiUrl}/spotify/playlists`, { headers });
  }
}

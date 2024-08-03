import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Playlist } from '../../models/playlist';
import { environment } from '../../../environments/environment';
import {AlertService} from "../alert.service";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getUserSpotifyPlaylists(): Observable<Playlist[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Playlist[]>(`${this.apiUrl}/spotify/playlists`, { headers })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const statusCode = error.status;
    const message = error.error.message || 'An unknown error occurred';
    this.alertService.showAlert(`Error Code: ${statusCode}\nMessage: ${message}`, 'error');
    return throwError({ statusCode, message });
  }
}

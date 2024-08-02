import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthConnectedAccount {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  loginWithSpotify(): Observable<{ authorizationUrl: string }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ authorizationUrl: string }>(`${this.apiUrl}/auth/providers/spotify/login`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  handleSpotifyCallback(code: string, state: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Making callback request with headers:', headers);
    return this.http.get<any>(`${this.apiUrl}/auth/providers/spotify/callback`, {
      headers,
      params: { code, state, token },
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}

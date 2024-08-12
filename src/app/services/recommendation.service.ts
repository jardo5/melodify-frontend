import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Song } from '../models/music/song.model';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRecommendations(): Observable<string[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No token found in localStorage'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<string[]>(`${this.apiUrl}/recommendations`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  refreshRecommendations(): Observable<string[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No token found in localStorage'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<string[]>(`${this.apiUrl}/recommendations/refresh`, {}, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}

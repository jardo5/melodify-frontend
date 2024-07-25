import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTopSongs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/songs/top`);
  }

  getSongByTitle(query: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/songs/search`, { headers, params: { query } });
  }

  getSongById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/songs/${id}`, { headers });
  }

  private handleError(error: any) {
    console.error('An error occurred:', error); // Log the error to the console
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}

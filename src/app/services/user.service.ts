import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from "../../environments/environment";
import {User} from "../models/user.model";
import {map} from "rxjs/operators";
import {AlertService} from "./alert.service";
import {Song} from "../models/music/song.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getUserInfo(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/users/info`, { headers }).pipe(
      map(response => new User(response))
    );
  }

  likeSong(userId: string, songId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/users/${userId}/like`, { songId }, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  dislikeSong(userId: string, songId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/users/${userId}/dislike`, { songId }, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  removeLikedSong(userId: string, songId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/users/${userId}/liked/${songId}`, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  removeDislikedSong(userId: string, songId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/users/${userId}/disliked/${songId}`, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error && error.error.message) {
      // Backend returned an error with a message
      errorMessage = error.error.message;
    } else if (error.error) {
      // Backend returned an error without a message
      errorMessage = `Error: ${error.error}`;
    } else {
      // Fallback error message
      errorMessage = error.statusText || 'An unknown error occurred!';
    }

    this.alertService.showAlert(errorMessage, 'error');
    return throwError(errorMessage);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, of, throwError} from 'rxjs';
import { environment } from "../../environments/environment";
import { User } from "../models/user.model";
import { map, tap } from "rxjs/operators";
import { AlertService } from "./alert.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private userCache: User | null = null;
  private userSubject = new BehaviorSubject<User | null>(null);


  constructor(private http: HttpClient, private alertService: AlertService) {}

  loadUserInfo(): Observable<User> {
    if (this.userCache) {
      return of(this.userCache); // Return the cached user data as an observable
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/users/info`, { headers }).pipe(
      tap(user => {
        this.userCache = user;
        this.userSubject.next(user); // Update the BehaviorSubject with the new user data
      }),
      catchError(this.handleError.bind(this))
    );
  }

  // Method to get the user info from cache
  getUserInfo(): Observable<User | null> {
    return this.userSubject.asObservable();
  }


  // Method to update user cache and re-fetch user info
  refreshUserInfo(): Observable<User> {
    this.userCache = null; // Invalidate the cache
    return this.loadUserInfo();
  }

  likeSong(userId: string, songId: string): Observable<any> {
    return this.updateUserInteraction(userId, songId, 'like', 'likedSongs');
  }

  dislikeSong(userId: string, songId: string): Observable<any> {
    return this.updateUserInteraction(userId, songId, 'dislike', 'dislikedSongs');
  }

  saveSong(userId: string, songId: string): Observable<any> {
    return this.updateUserInteraction(userId, songId, 'save', 'savedSongs');
  }

  isLiked(songId: string): boolean {
    return this.userCache?.likedSongs.includes(songId) ?? false;
  }

  isDisliked(songId: string): boolean {
    return this.userCache?.dislikedSongs.includes(songId) ?? false;
  }

  isSaved(songId: string): boolean {
    return this.userCache?.savedSongs.includes(songId) ?? false;
  }

  private updateUserInteraction(userId: string, songId: string, action: string, listKey: keyof User): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/users/${userId}/${action}`, { songId }, { headers }).pipe(
      tap(() => {
        if (this.userCache && Array.isArray(this.userCache[listKey])) {
          (this.userCache[listKey] as string[]).push(songId);  // Update cache
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  removeSongFromList(userId: string, songId: string, listKey: 'likedSongs' | 'dislikedSongs' | 'savedSongs'): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Determine the correct URL based on the listKey
    let endpoint = '';
    if (listKey === 'likedSongs') {
      endpoint = `${this.apiUrl}/users/${userId}/liked/${songId}`;
    } else if (listKey === 'dislikedSongs') {
      endpoint = `${this.apiUrl}/users/${userId}/disliked/${songId}`;
    } else if (listKey === 'savedSongs') {
      endpoint = `${this.apiUrl}/users/${userId}/saved/${songId}`;
    }

    return this.http.delete(endpoint, { headers }).pipe(
      tap(() => {
        if (this.userCache && Array.isArray(this.userCache[listKey])) {
          this.userCache[listKey] = this.userCache[listKey].filter(id => id !== songId);
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  removeLikedSong(userId: string, songId: string): Observable<any> {
    return this.removeSongFromList(userId, songId, 'likedSongs');
  }

  removeDislikedSong(userId: string, songId: string): Observable<any> {
    return this.removeSongFromList(userId, songId, 'dislikedSongs');
  }

  removeSavedSong(userId: string, songId: string): Observable<any> {
    return this.removeSongFromList(userId, songId, 'savedSongs');
  }

  invalidateCache(): void {
    this.userCache = null;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.error) {
      errorMessage = `Error: ${error.error}`;
    } else {
      errorMessage = error.statusText || 'An unknown error occurred!';
    }

    this.alertService.showAlert(errorMessage, 'error');
    return throwError(errorMessage);
  }
}

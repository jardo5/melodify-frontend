import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(usernameOrEmail: string, password: string): Observable<{ user: User, token: string }> {
    return this.http.post<{ user: any, token: string }>(`${this.apiUrl}/users/login`, { usernameOrEmail, password }).pipe(
      map(response => {
        const user = new User(response.user);
        this.saveToken(response.token);
        return { user, token: response.token };
      })
    );
  }

  register(username: string, email: string, password: string): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/users/signup`, { username, email, password }).pipe(
      map(response => new User(response.user))
    );
  }

  async logout(): Promise<void> {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
    }
    await this.router.navigate(['/auth/login']);
  }

  saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    const decodedToken: any = jwtDecode(token);
    const expiry = decodedToken.exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}

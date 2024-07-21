import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, { usernameOrEmail, password });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/signup`, { username, email, password });
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    await this.router.navigate(['/auth/login']);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
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
}

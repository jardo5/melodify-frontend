import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AlertComponent } from "../alert/alert.component";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    AlertComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDrawerOpen = false;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' = 'success';

  constructor(private authService: AuthService, private router: Router) {}

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
    const drawerCheckbox = document.getElementById('my-drawer-3') as HTMLInputElement;
    if (drawerCheckbox) {
      drawerCheckbox.checked = this.isDrawerOpen;
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']).then(success => {
      if (!success) {
        console.error('Navigation to home has failed');
      }
    });
  }

  logoutUser() {
    this.authService.logout().then(() => {
      this.toggleDrawer();
    }).catch(err => {
      console.error('Logout failed', err);
    });
  }

  navigateToSettings() {
    this.router.navigate(['/settings'])
    this.toggleDrawer();
  }

  navigateToPlaylists() {
    this.router.navigate(['/playlist']);
    this.toggleDrawer();
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrected property name
})
export class NavbarComponent {
  isDrawerOpen = false;

  constructor(private router: Router) {}

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
}

import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthService } from "./auth/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Melodify';

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    if (this.authService.isLoggedIn()) {
      await this.router.navigate(['/home']);
    } else {
      await this.router.navigate(['/auth/login']);
    }
  }
}

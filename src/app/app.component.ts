import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthService } from "./auth/auth.service";
import {AlertComponent} from "./shared/components/alert/alert.component";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {AlertService} from "./services/alert.service";
import { register } from 'swiper/element/bundle';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, AlertComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Melodify';

  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  private alertSubscription: Subscription;
  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {
    this.alertSubscription = this.alertService.getAlert().subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
      setTimeout(() => {
        this.alertMessage = '';
      }, 3000);
    });

    register();
  }
  ngOnDestroy() {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }

  async ngOnInit() {
    if (!this.authService.isLoggedIn()) { // If user is not logged in redirect to login page
      await this.router.navigate(['/auth/login']);
    }
  }
}

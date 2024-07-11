import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];

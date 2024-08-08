import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import {SettingsComponent} from "./pages/settings/settings.component";
import {CallbackComponent} from "./shared/components/callback/callback.component";
import {PlaylistComponent} from "./pages/playlist/playlist.component";
import {NgModule} from "@angular/core";
import {SavedSongsComponent} from "./pages/saved-songs/saved-songs.component";
import {RecommendationsComponent} from "./pages/recommendations/recommendations.component";

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: 'callback', component: CallbackComponent, canActivate: [AuthGuard]},
  { path: 'playlist', component: PlaylistComponent, canActivate: [AuthGuard]},
  { path: 'saved-songs', component: SavedSongsComponent, canActivate: [AuthGuard]},
  { path: 'recommendations', component: RecommendationsComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/auth/login' } //TODO: Change this to home or add a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { Component } from '@angular/core';
import {TopSongsComponent} from "../shared/components/top-songs/top-songs.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopSongsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

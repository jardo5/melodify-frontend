import { Component } from '@angular/core';
import {TopSongsComponent} from "../shared/components/top-songs/top-songs.component";
import {SearchComponent} from "../shared/components/search/search.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopSongsComponent,
    SearchComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SongService } from '../../../services/song.service';
import { Router } from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  searchResults: any[] = [];
  private clickListener: (() => void) | undefined;


  constructor(
    private songService: SongService,
    private router: Router,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.songService.getSongByTitle(query))
    ).subscribe(results => this.searchResults = results);

    this.clickListener = this.renderer.listen('document', 'click', (event: Event) => {
      if (!this.elRef.nativeElement.contains(event.target)) {
        this.searchResults = [];
      }
    });
  }
  ngOnDestroy(): void {
    // Clean up the click listener when the component is destroyed
    if (this.clickListener) {
      this.clickListener();
    }
}

  navigateToSong(id: string): void {
    console.log('Navigate to song with ID:', id);
  }
}

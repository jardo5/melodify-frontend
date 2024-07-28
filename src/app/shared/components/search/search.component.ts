import { Component, ElementRef, OnInit, Renderer2, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SongService } from '../../../services/song.service';
import { NgForOf, NgIf } from '@angular/common';

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
export class SearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl();
  searchResults: any[] = [];
  @Output() songSelected = new EventEmitter<string>();

  isLoading = false;
  errorMessage: string | null = null;

  private clickListener: (() => void) | undefined;

  constructor(
    private songService: SongService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        this.isLoading = true;
        return this.songService.getSongByTitle(query);
      })
    ).subscribe({
      next: results => {
        this.searchResults = results;
        this.isLoading = false;
        this.errorMessage = null;
      },
      error: err => {
        this.errorMessage = "Failed to fetch data.";
        this.isLoading = false;
      }
    });

    this.clickListener = this.renderer.listen('document', 'click', (event: Event) => {
      if (!this.elRef.nativeElement.contains(event.target)) {
        this.searchResults = [];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.clickListener) {
      this.clickListener();
    }
  }

  selectSong(id: string): void {
    this.songSelected.emit(id);
    this.clearSearchInput();
  }

  clearSearchInput(): void {
    this.searchControl.reset();
  }
}

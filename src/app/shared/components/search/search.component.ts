import { Component, ElementRef, OnInit, Renderer2, Output, EventEmitter } from '@angular/core';
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
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  searchResults: any[] = [];
  private clickListener: (() => void) | undefined;
  @Output() songSelected = new EventEmitter<any>();
  isLoading = false;
  errorMessage: string | null = null;

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
    this.isLoading = true;
    this.songService.getSongById(id).subscribe({
      next: song => {
        this.isLoading = false;
        this.songSelected.emit(song);
      },
      error: () => {
        this.errorMessage = "Failed to fetch song details.";
        this.isLoading = false;
      }
    });
  }
}

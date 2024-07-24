import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongService } from '../../../services/song.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-top-songs',
  templateUrl: './top-songs.component.html',
  styleUrls: ['./top-songs.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TopSongsComponent implements OnInit, AfterViewInit {
  topSongs: any[] = [];

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.songService.getTopSongs().subscribe((data: any[]) => {
      this.topSongs = data;
    });
  }

  ngAfterViewInit() {
    new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 5,
        },
      },
    });
  }
}

import {ExternalLink} from "./external-links";
import {Album} from "./album.model";
import {Artist} from "./artist.model";

export class Song {
  id: string;
  artist: string;
  title: string;
  fullTitle: string;
  imageUrl: string;
  appleMusicId: string;
  description: string;
  releaseDate: string;
  pageViews: number;
  geniusUrl: string;
  externalLinks: ExternalLink[];
  album: Album;
  primaryArtist: Artist;
  lyrics: string;
  sentiment: string;

  constructor(data: any) {
    this.id = data.id || '';
    this.artist = data.artist || '';
    this.title = data.title || '';
    this.fullTitle = data.fullTitle || '';
    this.imageUrl = data.imageUrl || '';
    this.appleMusicId = data.appleMusicId || '';
    this.description = data.description || '';
    this.releaseDate = data.releaseDate || '';
    this.pageViews = data.pageViews || 0;
    this.geniusUrl = data.geniusUrl || '';
    this.externalLinks = (data.externalLinks || []).map((link: any) => new ExternalLink(link));
    this.album = Album.fromJson(data.album || {});
    this.primaryArtist = Artist.fromJson(data.primaryArtist || {});
    this.lyrics = data.lyrics || '';
    this.sentiment = data.sentiment || '';
  }
}


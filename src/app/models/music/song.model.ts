// song.model.ts
import { ExternalLink } from "./external-links";
import { Album } from "./album.model";
import { Artist } from "./artist.model";
import { SentimentAnalysis } from "./sentiment-analysis.model";

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
  sentiment: SentimentAnalysis | null;

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
    this.externalLinks = this.initializeExternalLinks(data.externalLinks, this.appleMusicId);
    this.album = Album.fromJson(data.album || {});
    this.primaryArtist = Artist.fromJson(data.primaryArtist || {});
    this.lyrics = data.lyrics || '';
    this.sentiment = this.parseSentiment(data.sentiment);
  }

  // Adds the Apple Music link to the external links array if the Apple Music ID is present
  private initializeExternalLinks(externalLinks: any[], appleMusicId: string): ExternalLink[] {
    const links = externalLinks.map(link => new ExternalLink(link));
    if (appleMusicId) {
      links.push(new ExternalLink({ provider: 'Apple Music', url: this.getAppleMusicUrl(appleMusicId) }));
    }
    return links;
  }

  private getAppleMusicUrl(appleMusicId: string): string {
    return `https://music.apple.com/us/song/${appleMusicId}`;
  }

  private parseSentiment(sentiment: string | SentimentAnalysis | null): SentimentAnalysis | null {
    if (typeof sentiment === 'string') {
      try {
        const parsedSentiment = JSON.parse(sentiment) as SentimentAnalysis;
        console.log('Parsed Sentiment:', parsedSentiment); // Log the parsed sentiment
        return parsedSentiment;
      } catch (error) {
        console.error('Error parsing sentiment JSON:', error);
        return null;
      }
    }
    return sentiment;
  }
}

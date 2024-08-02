import { Song } from './music/song.model';

export interface Playlist {
  id: string; // ID of the playlist
  provider?: string; // Provider (e.g., Spotify, Apple Music, etc.)
  name: string; // Name of the playlist
  totalSongs: number; // Total number of songs in the playlist
  imageUrl: string; // Image URL of the playlist
  description: string; // Description of the playlist
  playlistUrl: string; // URL of the playlist
  songs?: Song[]; // List of songs in the playlist
  providerMetadata?: any; // Provider-specific metadata
}

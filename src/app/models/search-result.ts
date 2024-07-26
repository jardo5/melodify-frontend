export class SearchResult {
  id: string;
  name: string;
  artist: string;
  image: string;

  constructor(data: any) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.artist = data.artist || '';
    this.image = data.image || '';
  }
}

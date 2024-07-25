export class TopTrack {
  name: string;
  artist: string;
  image: string;

  constructor(data: any) {
    this.name = data.name || '';
    this.artist = data.artist || '';
    this.image = data.image || '';
  }
}

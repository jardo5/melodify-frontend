export class Artist {
  id: string;
  name: string;
  imageUrl: string;

  constructor(data: any) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.imageUrl = data.imageUrl || '';
  }

  static fromJson(data: any): Artist {
    return new Artist(data);
  }
}

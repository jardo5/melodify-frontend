export class Album {
  id: string;
  fullTitle: string;
  coverUrl: string;
  releaseDate: string;

  constructor(data: any) {
    this.id = data.id || '';
    this.fullTitle = data.fullTitle || '';
    this.coverUrl = data.coverUrl || '';
    this.releaseDate = data.releaseDate || '';
  }

  static fromJson(data: any): Album {
    return new Album(data);
  }
}

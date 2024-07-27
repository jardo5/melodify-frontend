export class Artist {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  twitterName: string;
  facebookName: string;
  instagramName: string;

  constructor(data: any) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.imageUrl = data.imageUrl || '';
    this.description = data.description || '';
    this.twitterName = data.twitterName || '';
    this.facebookName = data.facebookName || '';
    this.instagramName = data.instagramName || '';
  }

  static fromJson(data: any): Artist {
    return new Artist(data);
  }
}

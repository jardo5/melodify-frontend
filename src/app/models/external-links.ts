export class ExternalLink {
  provider: string;
  url: string;

  constructor(data: any) {
    this.provider = data.provider || '';
    this.url = data.url || '';
  }

  static fromJson(data: any): ExternalLink {
    return new ExternalLink(data);
  }
}

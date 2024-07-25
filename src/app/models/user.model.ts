export class User {
  id: string;
  username: string;
  email: string;
  role: string;
  connectedAccounts: ConnectedAccount[];

  constructor(data: any) {
    this.id = data.id || '';
    this.username = data.username || '';
    this.email = data.email || '';
    this.role = data.role || 'user';
    this.connectedAccounts = data.connectedAccounts ? data.connectedAccounts.map((account: any) => new ConnectedAccount(account)) : [];
  }
}

export class ConnectedAccount {
  provider: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;

  constructor(data: any) {
    this.provider = data.provider || '';
    this.accessToken = data.accessToken || '';
    this.refreshToken = data.refreshToken || '';
    this.expiresAt = data.expiresAt || 0;
  }
}

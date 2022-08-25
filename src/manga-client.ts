import { HttpClient } from './http-client';
import { promises as fs } from 'fs';
import { Manga } from './manga';

export class MangaClient {
  client: HttpClient;
  constructor() {
    this.client = new HttpClient('https://manga-chan.me');
  }
  async init() {}
  async login(login: string, password: string) {
    await this.client.postCookies('/', {
      login: 'submit',
      login_name: login,
      login_password: password,
      image: 'Вход',
    });
  }
  async search(value: string) {
    const data = await this.client.get('/', {
      do: 'search',
      subaction: 'search',
      story: value,
    });
    const row = data.window.document.querySelector(
      `.content_row`,
    ) as HTMLDivElement;
    const link = row.querySelector('h2 > a') as HTMLLinkElement;
    return new Manga(this, link.href);
  }
}

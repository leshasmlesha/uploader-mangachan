import { HttpClient } from './http-client';
import { Manga } from '../entities/manga';

export class MangaClient {
  client: HttpClient;
  constructor(readonly url: string) {
    this.client = new HttpClient(url);
  }
  async login(login: string, password: string) {
    await this.client.postCookies('/', {
      login: 'submit',
      login_name: login,
      login_password: password,
      image: 'Вход',
    });
  }
  async search(value: string, id?: boolean, demo?: boolean) {
    if (demo) return null;
    if (id) {
      return new Manga(this, `${this.url}/manga/${value}-2.html`);
    } else {
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
}

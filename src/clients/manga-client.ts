import { HttpClient } from './http-client';
import { Manga } from '../entities/manga';

export class MangaClient {
  client: HttpClient;
  constructor(readonly url: string) {
    this.client = new HttpClient(url);
  }
  async login(login: string, password: string) {
    const data = await this.client.postCookies('/', {
      login: 'submit',
      login_name: login,
      login_password: password,
      image: 'Вход',
    });
    const top_user = data.window.document.querySelector(
      '#top_user',
    ) as HTMLDivElement;
    const form = top_user.querySelector('form');
    if (form) {
      throw new Error('Вы не прошли авторизацию');
    }
  }
  async search(value: string, id?: boolean, demo?: boolean) {
    if (demo) return null;
    if (id) {
      return new Manga(this, `${this.url}/manga/${value}-2.html`);
    } else {
      const data = await this.client.post('/engine/ajax/search.php', {
        query: value,
      });
      const link = data.window.document.querySelector('a');
      if (!link) throw new Error('Манга не найдена');
      return new Manga(this, link.href);
    }
  }
}

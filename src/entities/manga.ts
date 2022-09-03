import { MangaClient } from '../clients/manga-client';
import FormData from 'form-data';
import empty_form_data from '../utils/empty_form_data';
/**
 * Экземляр манги на сайте
 */
export class Manga {
  /**
   * ID манги
   */
  private readonly id: number;
  /**
   * Имя манги
   */
  private readonly name: string;
  /**
   * Получаем экземпляр манги на сайте
   * @param client Клиент манги
   * @param url URL манги
   */
  constructor(private readonly client: MangaClient, url: string) {
    const data = url.match(/(.*)\/manga\/(\d+)-(.*)\.html/);
    this.id = Number(data[2]);
    this.name = data[3];
  }
  /**
   * Загрузка манги на сайт
   * @param volume том
   * @param chapter глава
   * @param file файл
   * @param title название главы
   */
  async upload(volume: number, chapter: number, file: Buffer, title?: string) {
    const data = new FormData();
    data.append('title', String(this.id));
    data.append('catlist[]', '6');
    data.append('xfield[vol]', String(volume));
    data.append('xfield[ch]', String(chapter));
    if (title) {
      data.append('xfield[ch_name]', String(title));
    } else {
      data.append('xfield[ch_name]', '');
    }
    data.append('xfield[manga]', `c:\\fakepath\\${volume} - ${chapter}.zip`);
    data.append('xfield_manga', file, {
      filename: `${volume} - ${chapter}.zip`,
    });
    empty_form_data(data);
    const page = await this.client.client.form(
      `addchapter?id=${this.id}`,
      data,
      true,
    );
    if (!page.includes('Глава добавлена'))
      throw new Error('Глава не загружена');
  }
}

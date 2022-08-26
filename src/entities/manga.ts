import { MangaClient } from '../clients/manga-client';
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
    data.append('xfield[vol]', String(volume));
    data.append('xfield[ch]', String(chapter));
    data.append('xfield_manga', String(file));
    if (title) data.append('xfield[ch_name]', String(title));
    const page = await this.client.client.form(
      `addchapter?id=${this.id}`,
      data,
    );
  }
}

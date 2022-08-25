import { MangaClient } from '../clients/manga-client';

export class Manga {
  private readonly id: number;
  private readonly name: string;
  constructor(private readonly client: MangaClient, url: string) {
    const data = url.match(/(.*)\/manga\/(\d+)-(.*)\.html/);
    this.id = Number(data[2]);
    this.name = data[3];
  }
  async upload(volume: number, chapter: number, file: Buffer, title?: string) {
    const data = new FormData();
    data.append('title', String(this.id));
    data.append('xfield[vol]', String(volume));
    data.append('xfield[ch]', String(chapter));
    data.append('xfield_manga', String(file));
    if (title) data.append('xfield[ch_name]', String(title));
    this.client.client.form(`addchapter?id=${this.id}`, data);
  }
}

import { AdapterChapterBase } from 'src/entities/adapter';
import fs from 'fs';
import { AdapterMangaFile } from './AdapterMangaFile';

export class AdapterChapterFile implements AdapterChapterBase {
  constructor(
    readonly manga: AdapterMangaFile,
    readonly volume: number,
    readonly chapter: number,
    readonly title: string,
  ) {}
  getFile(): Buffer {
    return fs.readFileSync(
      `${this.manga.adapter.path}/${this.manga.title}/${this.volume}/${this.chapter} - ${this.title}.zip`,
    );
  }
}

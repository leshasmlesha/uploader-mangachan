import { AdapterChapterBase } from 'src/base/adapter';
import fs from 'fs';
import { AdapterMangaFile } from './AdapterMangaFile';

export class AdapterChapterFile implements AdapterChapterBase {
  constructor(
    readonly manga: AdapterMangaFile,
    readonly volume: number,
    readonly chapter: number,
    readonly title?: string,
  ) {}
  getFile(): Buffer {
    if (this.title) {
      return fs.readFileSync(
        `${this.manga.adapter.path}/${this.manga.title}/${this.volume}/${this.chapter} - ${this.title}.zip`,
      );
    } else {
      return fs.readFileSync(
        `${this.manga.adapter.path}/${this.manga.title}/${this.volume}/${this.chapter}.zip`,
      );
    }
  }
}

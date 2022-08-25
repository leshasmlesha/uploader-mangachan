import { AdapterMangaBase } from 'src/base/adapter';
import fs from 'fs';
import { AdapterChapterFile } from './AdapterChapterFile';
import { AdapterFile } from './AdapterFile';

export class AdapterMangaFile implements AdapterMangaBase {
  constructor(readonly adapter: AdapterFile, readonly title: string) {}
  listChapter(): AdapterChapterFile[] {
    const result: AdapterChapterFile[] = [];
    const dirs = fs.readdirSync(`${this.adapter.path}/${this.title}`);
    for (const dir of dirs) {
      const files = fs.readdirSync(`${this.adapter.path}/${this.title}/${dir}`);
      for (const file of files) {
        const data = file.match(/(.*) - (.*)\.zip/);
        result.push(
          new AdapterChapterFile(this, Number(dir), Number(data[1]), data[2]),
        );
      }
    }
    return result;
  }
}

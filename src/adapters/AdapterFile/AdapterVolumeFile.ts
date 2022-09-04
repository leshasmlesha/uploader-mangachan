import { AdapterVolumeBase } from 'src/base/AdapterIntance';
import { AdapterChapterFile } from './AdapterChapterFile';
import { AdapterMangaFile } from './AdapterMangaFile';
import fs from 'fs';
export class AdapterVolumeFile implements AdapterVolumeBase {
  readonly volume: number;
  constructor(readonly manga: AdapterMangaFile, readonly path: string) {
    this.volume = Number(path);
  }
  listChapter(): AdapterChapterFile[] {
    const result: AdapterChapterFile[] = [];
    for (const chapter of fs.readdirSync(
      `${this.manga.adapter.path}/${this.manga.path}/${this.path}`,
    ))
      result.push(new AdapterChapterFile(this, chapter));
    return result;
  }
}

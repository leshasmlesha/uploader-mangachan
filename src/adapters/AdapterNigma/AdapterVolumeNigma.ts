import {
  AdapterChapterBase,
  AdapterMangaBase,
  AdapterVolumeBase,
} from 'src/base/AdapterIntance';
import { AdapterChapterNigma } from './AdapterChapterNigma';
import fs from 'fs';
import { AdapterStaticVolumeBase } from 'src/base/AdapterStatic';
export const AdapterVolumeNigma: AdapterStaticVolumeBase = class
  implements AdapterVolumeBase
{
  readonly volume: number;
  constructor(readonly manga: AdapterMangaBase, readonly path: string) {
    if (path) {
      const data = path.match(/^Volume (\d+)$/);
      this.volume = Number(data[1]);
    } else {
      this.volume = 1;
    }
  }
  listChapter(): AdapterChapterBase[] {
    const result: AdapterChapterBase[] = [];
    for (const chapter of fs.readdirSync(
      `${this.manga.adapter.path}/${this.manga.path}/${this.path}`,
    ))
      result.push(new AdapterChapterNigma(this, chapter));
    return result;
  }
};

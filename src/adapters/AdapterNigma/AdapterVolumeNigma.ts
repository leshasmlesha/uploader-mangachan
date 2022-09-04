import { AdapterVolumeBase } from 'src/base/AdapterIntance';
import { AdapterChapterNigma } from './AdapterChapterNigma';
import { AdapterMangaNigma } from './AdapterMangaNigma';
import fs from 'fs';
export class AdapterVolumeNigma implements AdapterVolumeBase {
  readonly volume: number;
  constructor(readonly manga: AdapterMangaNigma, readonly path: string) {
    if (path) {
      const data = path.match(/^Volume (\d+)$/);
      this.volume = Number(data[1]);
    } else {
      this.volume = 1;
    }
  }
  listChapter(): AdapterChapterNigma[] {
    const result: AdapterChapterNigma[] = [];
    for (const chapter of fs.readdirSync(
      `${this.manga.adapter.path}/${this.manga.path}/${this.path}`,
    ))
      result.push(new AdapterChapterNigma(this, chapter));
    return result;
  }
}

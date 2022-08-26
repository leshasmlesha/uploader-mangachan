import { AdapterVolumeBase } from 'src/base/adapter';
import { AdapterChapterNigma } from './AdapterChapterNigma';
import { AdapterMangaNigma } from './AdapterMangaNigma';
import fs from 'fs';
export class AdapterVolumeNigma implements AdapterVolumeBase {
  readonly volume: number;
  constructor(readonly manga: AdapterMangaNigma, readonly path: string) {
    const data = path.match(/^Volume (\d+)$/);
    this.volume = Number(data[1]);
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

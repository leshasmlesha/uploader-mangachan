import {
  AdapterChapterBase,
  AdapterMangaBase,
  AdapterVolumeBase,
} from 'src/base/AdapterIntance';
import { AdapterChapterFile } from './AdapterChapterFile';
import fs from 'fs';
import { AdapterStaticVolumeBase } from 'src/base/AdapterStatic';
export const AdapterVolumeFile: AdapterStaticVolumeBase = class
  implements AdapterVolumeBase
{
  readonly volume: number;
  constructor(readonly manga: AdapterMangaBase, readonly path: string) {
    this.volume = Number(path);
  }
  listChapter(): AdapterChapterBase[] {
    const result: AdapterChapterBase[] = [];
    for (const chapter of fs.readdirSync(
      `${this.manga.adapter.path}/${this.manga.path}/${this.path}`,
    ))
      result.push(new AdapterChapterFile(this, chapter));
    return result;
  }
};

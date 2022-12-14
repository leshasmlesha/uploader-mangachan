import {
  AdapterBase,
  AdapterMangaBase,
  AdapterVolumeBase,
} from 'src/base/AdapterIntance';
import fs from 'fs';
import { AdapterVolumeNigma } from './AdapterVolumeNigma';
import { AdapterStaticMangaBase } from 'src/base/AdapterStatic';

export const AdapterMangaNigma: AdapterStaticMangaBase = class
  implements AdapterMangaBase
{
  readonly title: string;
  constructor(readonly adapter: AdapterBase, readonly path: string) {
    this.title = path;
  }
  listVolume(): AdapterVolumeBase[] {
    const result: AdapterVolumeBase[] = [];
    const dirs = fs.readdirSync(`${this.adapter.path}/${this.path}`);
    for (const volume of dirs.filter((path) => path.match(/^Volume (\d+)$/)))
      result.push(new AdapterVolumeNigma(this, volume));
    if (result.length === 0)
      if (dirs.length > 0) return [new AdapterVolumeNigma(this, '')];
      else return [];
    return result;
  }
};

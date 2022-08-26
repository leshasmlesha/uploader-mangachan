import { AdapterMangaBase } from 'src/base/adapter';
import fs from 'fs';
import { AdapterNigma } from './AdapterNigma';
import { AdapterVolumeNigma } from './AdapterVolumeNigma';

export class AdapterMangaNigma implements AdapterMangaBase {
  readonly title: string;
  constructor(readonly adapter: AdapterNigma, readonly path: string) {
    this.title = path;
  }
  listVolume(): AdapterVolumeNigma[] {
    const result: AdapterVolumeNigma[] = [];
    for (const volume of fs.readdirSync(`${this.adapter.path}/${this.path}`))
      result.push(new AdapterVolumeNigma(this, volume));
    return result;
  }
}
import { AdapterMangaBase } from 'src/base/adapter';
import fs from 'fs';
import { AdapterFile } from './AdapterFile';
import { AdapterVolumeFile } from './AdapterVolumeFile';

export class AdapterMangaFile implements AdapterMangaBase {
  readonly title: string;
  constructor(readonly adapter: AdapterFile, readonly path: string) {
    this.title = path;
  }
  listVolume(): AdapterVolumeFile[] {
    const result: AdapterVolumeFile[] = [];
    for (const volume of fs.readdirSync(`${this.adapter.path}/${this.path}`))
      result.push(new AdapterVolumeFile(this, volume));
    return result;
  }
}

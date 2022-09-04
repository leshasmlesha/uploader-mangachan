import { AdapterBase, AdapterMangaBase } from 'src/base/AdapterIntance';
import fs from 'fs';
import { AdapterVolumeFile } from './AdapterVolumeFile';

export class AdapterMangaFile implements AdapterMangaBase {
  readonly title: string;
  constructor(readonly adapter: AdapterBase, readonly path: string) {
    this.title = path;
  }
  listVolume(): AdapterVolumeFile[] {
    const result: AdapterVolumeFile[] = [];
    for (const volume of fs.readdirSync(`${this.adapter.path}/${this.path}`))
      result.push(new AdapterVolumeFile(this, volume));
    return result;
  }
}

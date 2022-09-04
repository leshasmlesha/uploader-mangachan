import {
  AdapterBase,
  AdapterMangaBase,
  AdapterVolumeBase,
} from 'src/base/AdapterIntance';
import fs from 'fs';
import { AdapterVolumeFile } from './AdapterVolumeFile';
import { AdapterStaticMangaBase } from 'src/base/AdapterStatic';

export const AdapterMangaFile: AdapterStaticMangaBase = class
  implements AdapterMangaBase
{
  readonly title: string;
  constructor(readonly adapter: AdapterBase, readonly path: string) {
    this.title = path;
  }
  listVolume(): AdapterVolumeBase[] {
    const result: AdapterVolumeBase[] = [];
    for (const volume of fs.readdirSync(`${this.adapter.path}/${this.path}`))
      result.push(new AdapterVolumeFile(this, volume));
    return result;
  }
};

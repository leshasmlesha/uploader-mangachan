import { AdapterChapterBase } from 'src/base/AdapterIntance';
import fs from 'fs';
import { AdapterVolumeFile } from './AdapterVolumeFile';

export class AdapterChapterFile implements AdapterChapterBase {
  readonly chapter: number;
  readonly title?: string;
  constructor(readonly volume: AdapterVolumeFile, readonly path: string) {
    const data = path.match(/(\d+)(| - (.*))\.zip/);
    this.chapter = Number(data[1]);
    this.title = data[3];
  }
  async getFile(): Promise<Buffer> {
    return fs.readFileSync(
      `${this.volume.manga.adapter.path}/${this.volume.manga.path}/${this.volume.path}/${this.path}`,
    );
  }
}

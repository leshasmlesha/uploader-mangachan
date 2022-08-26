import { AdapterChapterBase } from 'src/base/adapter';
import fs from 'fs';
import { AdapterVolumeNigma } from './AdapterVolumeNigma';
import JSZip from 'jszip';

export class AdapterChapterNigma implements AdapterChapterBase {
  readonly chapter: number;
  readonly title?: string;
  constructor(readonly volume: AdapterVolumeNigma, readonly path: string) {
    const data = path.match(/^(\d+(|\.\d+))(| -(.*))$/);
    this.chapter = Number(data[1]);

    if (data[4]?.match(/.\d+/)) {
      this.chapter = Number(`${data[1]}${data[3]}`);
    } else {
      this.title = data[4]?.slice(1);
    }
  }
  async getFile(): Promise<Buffer> {
    const zip = new JSZip();

    for (const file of fs.readdirSync(
      `${this.volume.manga.adapter.path}/${this.volume.manga.path}/${this.volume.path}/${this.path}`,
    ))
      zip.file(
        file,
        fs.readFileSync(
          `${this.volume.manga.adapter.path}/${this.volume.manga.path}/${this.volume.path}/${this.path}/${file}`,
        ),
      );
    return zip.generateAsync({ type: 'nodebuffer' });
  }
}

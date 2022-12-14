import { AdapterChapterBase, AdapterVolumeBase } from 'src/base/AdapterIntance';
import fs from 'fs';
import JSZip from 'jszip';
import { AdapterStaticChapterBase } from 'src/base/AdapterStatic';

export const AdapterChapterNigma: AdapterStaticChapterBase = class
  implements AdapterChapterBase
{
  readonly chapter: number;
  readonly title?: string;
  constructor(readonly volume: AdapterVolumeBase, readonly path: string) {
    const data = path.match(/^(\d+(|\.\d+))(| -(.*))$/);
    this.chapter = Number(data[1]);

    if (data[4]?.match(/^\.\d+$/)) {
      this.chapter = Number(`${data[1]}${data[4]}`);
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
    return await zip.generateAsync({ type: 'nodebuffer' });
  }
};

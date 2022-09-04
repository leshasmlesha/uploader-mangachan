import { AdapterChapterBase, AdapterVolumeBase } from 'src/base/AdapterIntance';
import fs from 'fs';
import JSZip from 'jszip';
import mimeType from 'mime-types';
import { AdapterStaticChapterBase } from 'src/base/AdapterStatic';

export const AdapterChapterJorogumo: AdapterStaticChapterBase = class
  implements AdapterChapterBase
{
  readonly chapter: number;
  readonly title?: string;
  constructor(readonly volume: AdapterVolumeBase, readonly path: string) {
    const data = path.match(/^(\d+(|\.\d+))(| - (.*))$/);
    this.chapter = Number(data[1]);
    this.title = data[4];
  }
  async getFile(): Promise<Buffer> {
    const zip = new JSZip();

    for (const file of fs
      .readdirSync(
        `${this.volume.manga.adapter.path}/${this.volume.manga.path}/${this.volume.path}/${this.path}`,
      )
      .filter((path) =>
        ['image/gif', 'image/jpeg', 'image/png'].includes(
          String(mimeType.lookup(path)),
        ),
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

import { AdapterBase, AdapterMangaBase } from 'src/base/adapter';
import fs from 'fs';
import { AdapterMangaFile } from './AdapterMangaFile';

export class AdapterFile implements AdapterBase {
  readonly title = 'Адаптер для файлов';
  readonly name: 'AdapterFile';
  readonly description: `Адаптер для файлов: Обычный
  Структура:
  Название манги/Том/Глава - Название главы.zip`;
  constructor(readonly path: string) {}
  listManga(): AdapterMangaFile[] {
    return fs
      .readdirSync(this.path)
      .map((dir) => new AdapterMangaFile(this, dir));
  }
}

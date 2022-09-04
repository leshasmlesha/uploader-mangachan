import { AdapterBase } from 'src/base/AdapterIntance';
import fs from 'fs';
import { AdapterMangaFile } from './AdapterMangaFile';
import wait_input from '../../utils/wait_input';
import { AdapterStaticBase } from 'src/base/AdapterStatic';

export const AdapterFile: AdapterStaticBase = class implements AdapterBase {
  static readonly title = 'Адаптер для файлов';
  static readonly adapter = 'AdapterFile';
  static readonly description = `
  Адаптер для файлов: Обычный
  Структура:
  Название манги/Том/Глава - Название главы.zip`;
  constructor(readonly path: string, readonly search_id?: boolean) {}
  async required() {
    console.log(`
    Адаптер: ${AdapterFile.title}
    Рабочая папка: ${this.path}
    Имя адаптера: ${AdapterFile.adapter}
    Описание: ${AdapterFile.description}
    `);
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }
    await wait_input('Нажмите Enter чтобы продолжить');
  }
  listManga(): AdapterMangaFile[] {
    return fs
      .readdirSync(this.path)
      .filter((path) => (this.search_id ? path.match(/^\d+$/) : true))
      .map((dir) => new AdapterMangaFile(this, dir));
  }
};

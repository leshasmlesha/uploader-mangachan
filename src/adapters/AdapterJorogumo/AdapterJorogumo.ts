import { AdapterBase, AdapterMangaBase } from 'src/base/AdapterIntance';
import fs from 'fs';
import { AdapterMangaJorogumo } from './AdapterMangaJorogumo';
import wait_input from '../../utils/wait_input';
import { AdapterStaticBase } from 'src/base/AdapterStatic';

export const AdapterJorogumo: AdapterStaticBase = class implements AdapterBase {
  static readonly title = 'Адаптер для Jorogumo';
  static readonly adapter = 'AdapterJorogumo';
  static readonly description = `
      Адаптер для файлов: Jorogumo
      Структура:
        Название манги/Volume Том/Глава - Название главы/`;
  constructor(readonly path: string, readonly search_id?: boolean) {}
  async required() {
    console.log(`
    Адаптер: ${AdapterJorogumo.title}
    Рабочая папка: ${this.path}
    Имя адаптера: ${AdapterJorogumo.adapter}
    Описание: ${AdapterJorogumo.description}
    `);
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }
    await wait_input('Нажмите Enter чтобы продолжить');
  }
  listManga(): AdapterMangaBase[] {
    return fs
      .readdirSync(this.path)
      .filter((path) => (this.search_id ? path.match(/^\d+$/) : true))
      .map((dir) => new AdapterMangaJorogumo(this, dir));
  }
};

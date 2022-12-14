import { AdapterBase, AdapterMangaBase } from 'src/base/AdapterIntance';
import fs from 'fs';
import { AdapterMangaNigma } from './AdapterMangaNigma';
import wait_input from '../../utils/wait_input';
import { AdapterStaticBase } from 'src/base/AdapterStatic';

export const AdapterNigma: AdapterStaticBase = class implements AdapterBase {
  static readonly title = 'Адаптер для NigmaX';
  static readonly adapter = 'AdapterNigma';
  static readonly description = `
      Адаптер для файлов: Nigma
      Структура:
        Название манги/Volume Том/Глава - Название главы/
        Название манги/Глава - Название главы/`;
  constructor(readonly path: string, readonly search_id?: boolean) {}
  async required() {
    console.log(`
    Адаптер: ${AdapterNigma.title}
    Рабочая папка: ${this.path}
    Имя адаптера: ${AdapterNigma.adapter}
    Описание: ${AdapterNigma.description}
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
      .map((dir) => new AdapterMangaNigma(this, dir));
  }
};

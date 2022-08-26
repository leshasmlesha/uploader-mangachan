import { AdapterBase } from 'src/base/adapter';
import fs from 'fs';
import { AdapterMangaNigma } from './AdapterMangaNigma';
import wait_input from '../../utils/wait_input';

export class AdapterNigma implements AdapterBase {
  readonly title = 'Адаптер для NigmaX';
  readonly name = 'AdapterNigma';
  readonly description = `
  Адаптер для файлов: Nigma
  Структура:
  Название манги/Volume Том/Глава - Название главы/`;
  constructor(readonly path: string, readonly search_id?: boolean) {}
  async required() {
    console.log(`
    Адаптер: ${this.title}
    Рабочая папка: ${this.path}
    Имя адаптера: ${this.name}
    Описание: ${this.description}
    `);
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }
    await wait_input('Нажмите Enter чтобы продолжить');
  }
  listManga(): AdapterMangaNigma[] {
    return fs
      .readdirSync(this.path)
      .filter((path) => (this.search_id ? path.match(/^\d+$/) : true))
      .map((dir) => new AdapterMangaNigma(this, dir));
  }
}

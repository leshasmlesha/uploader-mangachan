import { AdapterBase } from 'src/base/adapter';
import fs from 'fs';
import { AdapterMangaFile } from './AdapterMangaFile';
import wait_input from '../../utils/wait_input';

export class AdapterFile implements AdapterBase {
  readonly title = 'Адаптер для файлов';
  readonly name = 'AdapterFile';
  readonly description = `
  Адаптер для файлов: Обычный
  Структура:
  Название манги/Том/Глава - Название главы.zip`;
  constructor(readonly path: string) {}
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
  listManga(): AdapterMangaFile[] {
    return fs
      .readdirSync(this.path)
      .map((dir) => new AdapterMangaFile(this, dir));
  }
}

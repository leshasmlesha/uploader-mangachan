/**
 * Адаптер хранилища
 */
export interface AdapterBase {
  /**
   * Название адаптера
   */
  readonly title: string;
  /**
   * Имя адаптера
   */
  readonly name: string;
  /**
   * Описание адаптера
   */
  readonly description: string;
  /**
   * Путь к папке с данными
   */
  readonly path: string;
  /**
   * Выводит информацию о адаптере
   */
  required(): Promise<void>;
  /**
   * Возвращает список манги
   */
  listManga(): AdapterMangaBase[];
}
/**
 * Адаптер манги
 */
export interface AdapterMangaBase {
  /**
   * Название манги
   */
  readonly title: string;
  /**
   * Адаптер хранилища из готорого был вызван
   */
  readonly adapter: AdapterBase;
  listChapter(): AdapterChapterBase[];
}
/**
 * Адаптер главы
 */
export interface AdapterChapterBase {
  /**
   * Адаптер манги из которого был вызван
   */
  readonly manga: AdapterMangaBase;
  /**
   * Том
   */
  readonly volume: number;
  /**
   * Глава
   */
  readonly chapter: number;
  /**
   * Название главы
   */
  readonly title: string;
  /**
   * Получить файл главы
   */
  getFile(): Buffer;
}

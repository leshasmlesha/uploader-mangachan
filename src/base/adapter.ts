/**
 * Статические параметры Хранилище
 */
export interface AdapterStaticBase {
  /**
   * Название адаптера
   */
  readonly title: string;
  /**
   * Описание адаптера
   */
  readonly description: string;
  /**
   * Имя адаптера
   */
  readonly adapter: string;
  /**
   * @param path Путь к рабочей папке
   * @param search_id поиск по id
   */
  new (path: string, search_id?: boolean): AdapterBase;
}
/**
 * Адаптер хранилища
 */
export interface AdapterBase {
  /**
   * Путь к папке с данными
   */
  readonly path: string;

  /**
   * Включить поиск по ID
   */
  readonly search_id?: boolean;
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
  /**
   * Папка с мангой
   */
  readonly path: string;
  listVolume(): AdapterVolumeBase[];
}
/**
 * Адаптер тома
 */
export interface AdapterVolumeBase {
  /**
   * Том
   */
  readonly volume: number;
  /**
   * Адаптер манги из которого был вызван
   */
  readonly manga: AdapterMangaBase;
  /**
   * Папка с томом
   */
  readonly path: string;
  listChapter(): AdapterChapterBase[];
}
/**
 * Адаптер главы
 */
export interface AdapterChapterBase {
  /**
   * Адаптер тома из готорого был вызван
   */
  readonly volume: AdapterVolumeBase;
  /**
   * Глава
   */
  readonly chapter: number;
  /**
   * Папка с главой
   */
  readonly path: string;
  /**
   * Название главы
   */
  readonly title?: string;
  /**
   * Получить файл главы
   */
  getFile(): Promise<Buffer>;
}

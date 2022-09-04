import {
  AdapterBase,
  AdapterChapterBase,
  AdapterMangaBase,
  AdapterVolumeBase,
} from './AdapterIntance';

/**
 * Статические параметры Хранилища
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
 * Статические параметры манги
 */
export interface AdapterStaticMangaBase {
  /**
   * @param adapter Адаптер хранилища из которого был вызван
   * @param path Путь к манге
   */
  new (adapter: AdapterBase, path: string): AdapterMangaBase;
}
/**
 * Статические параметры тома
 */
export interface AdapterStaticVolumeBase {
  /**
   * @param manga Адаптер манги из которого был вызван
   * @param path Путь к тому
   */
  new (manga: AdapterMangaBase, path: string): AdapterVolumeBase;
}
/**
 * Статические параметры главы
 */
export interface AdapterStaticChapterBase {
  /**
   * @param volume Адаптер тома из которого был вызван
   * @param path Путь к главе
   */
  new (volume: AdapterVolumeBase, path: string): AdapterChapterBase;
}

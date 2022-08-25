export interface AdapterBase {
  readonly title: string;
  readonly name: string;
  readonly description: string;
  readonly path: string;
  listManga(): AdapterMangaBase[];
}
export interface AdapterMangaBase {
  readonly title: string;
  readonly adapter: AdapterBase;
  listChapter(): AdapterChapterBase[];
}
export interface AdapterChapterBase {
  readonly manga: AdapterMangaBase;
  readonly volume: number;
  readonly chapter: number;
  readonly title: string;
  getFile(): Buffer;
}

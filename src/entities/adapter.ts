export interface AdapterBase {
  title: string;
  name: string;
  description: string;
  listManga(): AdapterMangaBase[];
}
export interface AdapterMangaBase {
  title: string;
  listChapter(): AdapterChapterBase[];
}
export interface AdapterChapterBase {
  volume: string;
  chapter: string;
  title: string;
  getFile(): Buffer;
}

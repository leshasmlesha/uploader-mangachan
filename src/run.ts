import getConfig from './utils/config';
import { MangaClient } from './clients/manga-client';
import { AdapterBase } from './base/adapter';

async function start(adapter: AdapterBase) {
  const client = new MangaClient();
  const config = getConfig();
  console.log('Авторизация....');
  await client.login(config.login, config.password);
  for (const mangaLocal of adapter.listManga()) {
    console.log(`Поиск манги ${mangaLocal.title}`);
    const manga_online = await client.search(mangaLocal.title);
    const chapters = mangaLocal.listChapter();
    console.log(`Загрузка глав в кол-ве ${chapters.length}`);
    for (const chapter of chapters) {
      await manga_online.upload(
        chapter.volume,
        chapter.chapter,
        chapter.getFile(),
        chapter.title,
      );
    }
  }
}
export async function call(adapter: AdapterBase) {
  try {
    await start(adapter);
  } catch (e) {
    console.log(e);
  }
}

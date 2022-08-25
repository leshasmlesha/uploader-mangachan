import getConfig from './utils/config';
import { MangaClient } from './clients/manga-client';
import { AdapterBase } from './entities/adapter';

async function start(adapter: AdapterBase) {
  const client = new MangaClient();
  const config = getConfig();
  await client.login(config.login, config.password);
  for (const mangaLocal of adapter.listManga()) {
    const manga_online = await client.search(mangaLocal.title);
    for (const chapter of mangaLocal.listChapter()) {
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

import getConfig from './utils/config';
import { MangaClient } from './clients/manga-client';
import { AdapterBase } from './base/adapter';
import cliProgess from 'cli-progress';

async function start(adapter: AdapterBase) {
  await adapter.required();
  const client = new MangaClient();
  const config = getConfig();
  console.log('Авторизация....');
  await client.login(config.login, config.password);
  for (const mangaLocal of adapter.listManga()) {
    console.log(`Поиск манги ${mangaLocal.title}`);
    const manga_online = await client.search(mangaLocal.title);
    const chapters = mangaLocal.listChapter();
    console.log(`Загрузка глав в кол-ве ${chapters.length}`);
    const bar = new cliProgess.SingleBar({
      format: `Загрузка манги ${mangaLocal.title} | {bar} | {percentage}%| {value}/{total} Глав | Текущая глава: {volume}`,
    });
    bar.start(chapters.length, 0);
    for (const chapter of chapters) {
      bar.increment({
        volume: `Том ${chapter.volume} глава ${chapter.chapter} - ${chapter.title}`,
      });
      await manga_online.upload(
        chapter.volume,
        chapter.chapter,
        chapter.getFile(),
        chapter.title,
      );
    }
    bar.stop();
  }
  console.log('Загрузка завершена');
}
export async function call(adapter: AdapterBase) {
  try {
    await start(adapter);
    process.exit();
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log(e);
    }
  }
}

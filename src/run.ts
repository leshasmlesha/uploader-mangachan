import getConfig from './utils/config';
import { MangaClient } from './clients/manga-client';
import { AdapterBase } from './base/adapter';
import cliProgess from 'cli-progress';
import wait_input from './utils/wait_input';

async function start(adapter: AdapterBase) {
  const config = getConfig();
  await adapter.required();
  const client = new MangaClient(config.url);
  console.log('Авторизация....');
  await client.login(config.login, config.password);
  for (const mangaLocal of adapter.listManga()) {
    console.log(`Поиск манги ${mangaLocal.title}`);
    const manga_online = await client.search(
      mangaLocal.title,
      adapter.search_id,
    );
    const chapters = mangaLocal.listChapter();
    console.log(`Загрузка глав в кол-ве ${chapters.length}`);
    const bar = new cliProgess.SingleBar({
      format: `Загрузка манги ${mangaLocal.title} | {bar} | {percentage}%| {value}/{total} Глав | Текущая глава: {volume}`,
    });
    bar.start(chapters.length, 0);
    for (const chapter of chapters) {
      if (chapter.title) {
        bar.increment({
          volume: `Том ${chapter.volume} глава ${chapter.chapter} - ${chapter.title}`,
        });
      } else {
        bar.increment({
          volume: `Том ${chapter.volume} глава ${chapter.chapter}`,
        });
      }
      if (!config.demo) {
        await manga_online.upload(
          chapter.volume,
          chapter.chapter,
          chapter.getFile(),
          chapter.title,
        );
      } else {
        console.log({ ...chapter, file: chapter.getFile() });
      }
    }
    bar.stop();
  }
  console.log('Загрузка завершена');
}
export async function call(adapter: AdapterBase) {
  try {
    await start(adapter);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log(e);
    }
  } finally {
    await wait_input('Нажмите Enter чтобы выйти');
    process.exit();
  }
}

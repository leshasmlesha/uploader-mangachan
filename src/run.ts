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
      config.demo,
    );
    const volumes = mangaLocal.listVolume();
    console.log(`Загрузка томов в кол-ве ${volumes.length}`);
    const bar = new cliProgess.SingleBar({
      format: `Загрузка манги ${mangaLocal.title} | {bar} | {percentage}%| {value}/{total} Глав | Текущая глава: {volume}`,
    });
    bar.start(volumes.length, 0);
    for (const volume of volumes) {
      for (const chapter of volume.listChapter()) {
        if (chapter.title) {
          bar.increment({
            volume: `Том ${chapter.volume.volume} глава ${chapter.chapter} - ${chapter.title}`,
          });
        } else {
          bar.increment({
            volume: `Том ${chapter.volume.volume} глава ${chapter.chapter}`,
          });
        }
        if (!config.demo) {
          await manga_online.upload(
            chapter.volume.volume,
            chapter.chapter,
            await chapter.getFile(),
            chapter.title,
          );
        } else {
          console.log({ ...chapter, file: await chapter.getFile() });
        }
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

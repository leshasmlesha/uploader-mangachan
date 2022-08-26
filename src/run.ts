import getConfig from './utils/config';
import { MangaClient } from './clients/manga-client';
import { AdapterBase } from './base/adapter';
import cliProgress, { MultiBar } from 'cli-progress';
import wait_input from './utils/wait_input';
function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
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
    console.log(`Загрузка манги ${mangaLocal.title}`);
    const multibar = new cliProgress.MultiBar({
      clearOnComplete: false,
      hideCursor: true,
      format: `Загрузка {what} | {bar} | {percentage}%| {value}/{total} {whats} | {current_name}: {current_value}`,
    });
    const bar_volume = multibar.create(volumes.length, 0);
    const bar_chapter = multibar.create(0, 0);
    for (const volume of volumes) {
      bar_volume.increment({
        what: 'тома',
        whats: 'томов',
        current_name: 'Текуший том',
        current_value: `Том ${volume.volume}`,
      });
      console.log(volume);
      const chapters = volume.listChapter();
      bar_chapter.start(chapters.length, 0);
      for (const chapter of chapters) {
        if (chapter.title) {
          bar_chapter.increment({
            what: 'главы',
            whats: 'глав',
            current_name: 'Текушая глава',
            current_value: `глава ${chapter.chapter} - ${chapter.title}`,
          });
        } else {
          bar_chapter.increment({
            what: 'главы',
            whats: 'глав',
            current_name: 'Текушая глава',
            current_value: `глава ${chapter.chapter}`,
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
          await timeout(1000);
          //console.log({ ...chapter, file: await chapter.getFile() });
        }
      }
      bar_chapter.stop();
    }
    bar_volume.stop();
    multibar.stop();
  }
  console.log('\nЗагрузка завершена');
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

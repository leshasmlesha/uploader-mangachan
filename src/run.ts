import { MangaClient } from './clients/manga-client';
import { AdapterBase } from './base/AdapterIntance';
import cliProgress from 'cli-progress';
import wait_input from './utils/wait_input';
import { Credentials } from './utils/config';
import { Args } from './cli';
function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function start(adapter: AdapterBase, config: Credentials, options: Args) {
  await adapter.required();
  const client = new MangaClient(config.url);
  console.log('Авторизация....');
  if (!config.demo) await client.login(config.login, config.password);
  for (const mangaLocal of adapter.listManga()) {
    console.log(`Поиск манги ${mangaLocal.title}`);
    const manga_online = await client.quick_search(
      mangaLocal.title,
      adapter.search_id,
      config.demo,
    );
    if (options.verbose) console.log(mangaLocal);
    if (options.verbose) console.log(manga_online);
    const volumes = mangaLocal.listVolume();
    console.log(`Загрузка манги ${mangaLocal.title}`);
    const multibar = new cliProgress.MultiBar({
      clearOnComplete: false,
      hideCursor: true,
      format: !options.verbose
        ? `Загрузка {what} | {bar} | {percentage}%| {value}/{total} {whats} | {current_name}: {current_value}`
        : `Прогресс бар отключен для отладки`,
    });
    const bar_volume = multibar.create(volumes.length, 0);
    const bar_chapter = multibar.create(0, 0);
    for (const volume of volumes) {
      if (!options.verbose)
        bar_volume.increment({
          what: 'тома',
          whats: 'томов',
          current_name: 'Текуший том',
          current_value: `Том ${volume.volume}`,
        });
      if (options.verbose) console.log(volume);
      const chapters = volume.listChapter();
      if (!options.verbose) bar_chapter.start(chapters.length, 0);
      for (const chapter of chapters) {
        if (!options.verbose)
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
        const file = await chapter.getFile();
        if (!config.demo) {
          if (options.verbose) console.log({ ...chapter, file });
          let loading = true;
          while (loading)
            try {
              await manga_online.upload(
                chapter.volume.volume,
                chapter.chapter,
                await chapter.getFile(),
                chapter.title,
              );
              loading = false;
              await timeout(options['timeout'] * 1000);
            } catch (e) {
              await timeout(options['timeout-error'] * 1000);
              if (options.verbose)
                console.log(
                  'Произошла ошибка во время загрузки(повтор): ',
                  chapter,
                  e,
                );
              if (options.exception) throw e;
            }
        } else {
          await timeout(1000);
          if (options.verbose) console.log({ ...chapter, file });
        }
      }
      bar_chapter.stop();
    }
    bar_volume.stop();
    multibar.stop();
  }
  console.log('\nЗагрузка завершена');
}
export async function call(
  adapter: AdapterBase,
  config: Credentials,
  options: Args,
) {
  try {
    await start(adapter, config, options);
  } catch (e) {
    if (options.verbose) {
      console.error(e);
    } else {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error(e);
      }
    }
  } finally {
    await wait_input('Нажмите Enter чтобы выйти');
    process.exit();
  }
}

import getConfig from './config';
import { MangaClient } from './manga-client';

async function start() {
  const client = new MangaClient();
  const config = getConfig();
  await client.login(config.login, config.password);
  const manga = await client.search('Chainsaw Man');
}
async function call() {
  try {
    await start();
  } catch (e) {
    console.log(e);
  }
}
call();

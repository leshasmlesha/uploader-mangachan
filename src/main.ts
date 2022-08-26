import { adapters } from './adapters';
import { AdapterBase } from './base/adapter';
import { parseArgumentsIntoOptions, promptForMissingOptions } from './cli';
import { call } from './run';
import getConfig from './utils/config';
import wait_input from './utils/wait_input';
export async function cli(args: string[]) {
  try {
    const config = getConfig();
    let options = parseArgumentsIntoOptions(args);
    if (options.interactive) options = await promptForMissingOptions(options);
    const adapterStatic = adapters.find(
      (adapter) => adapter.adapter === options.adapter,
    );
    const adapter: AdapterBase = new adapterStatic(
      options.work,
      options['search-id'],
    );
    await call(adapter, config, options);
  } catch (e) {
    console.log(e.message);
    await wait_input('Нажмите Enter чтобы выйти');
    process.exit();
  }
}
cli(process.argv);

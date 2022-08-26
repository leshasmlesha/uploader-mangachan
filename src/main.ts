import { adapters } from './adapters';
import { AdapterBase } from './base/adapter';
import { parseArgumentsIntoOptions, promptForMissingOptions } from './cli';
import { call } from './run';
import getConfig from './utils/config';
export async function cli(args: string[]) {
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
  call(adapter, config, options);
}
cli(process.argv);

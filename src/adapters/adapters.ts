import { AdapterStaticBase } from 'src/base/adapter';
import { AdapterFile } from './AdapterFile';
import { AdapterNigma } from './AdapterNigma';
export { AdapterFile };
export { AdapterNigma };
export const adapters: AdapterStaticBase[] = [AdapterFile, AdapterNigma];
export const defaultAdapter = 'AdapterFile';

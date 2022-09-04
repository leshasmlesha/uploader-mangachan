import { AdapterStaticBase } from 'src/base/AdapterStatic';
import { AdapterFile } from './AdapterFile';
import { AdapterNigma } from './AdapterNigma';
export { AdapterFile };
export { AdapterNigma };
export const adapters: AdapterStaticBase[] = [AdapterFile, AdapterNigma];
export const defaultAdapter = 'AdapterFile';

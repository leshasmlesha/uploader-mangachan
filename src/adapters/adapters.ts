import { AdapterStaticBase } from 'src/base/AdapterStatic';
import { AdapterFile } from './AdapterFile';
import { AdapterJorogumo } from './AdapterJorogumo';
import { AdapterNigma } from './AdapterNigma';
export { AdapterFile };
export { AdapterNigma };
export { AdapterJorogumo };
export const adapters: AdapterStaticBase[] = [
  AdapterFile,
  AdapterNigma,
  AdapterJorogumo,
];
export const defaultAdapter = 'AdapterFile';

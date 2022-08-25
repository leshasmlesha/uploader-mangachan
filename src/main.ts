import { AdapterFile } from './adapters';
import { AdapterBase } from './base/adapter';
import { call } from './run';
const adapter: AdapterBase = new AdapterFile('files');
call(adapter);

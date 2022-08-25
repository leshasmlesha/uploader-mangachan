import { AdapterFile } from './adapters';
import { AdapterBase } from './entities/adapter';
import { call } from './run';
const adapter: AdapterBase = new AdapterFile('files');
call(adapter);

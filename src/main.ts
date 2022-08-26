import { AdapterNigma } from './adapters';
import { AdapterBase } from './base/adapter';
import { call } from './run';
const adapter: AdapterBase = new AdapterNigma('files');
call(adapter);

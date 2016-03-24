//main.js with Synchronous modules all in one
import {WA} from './core/main.js';
export const wa = WA.create();
import { mod_timing as timing} from './modules/timing';
wa.use(timing.name,timing.fn);
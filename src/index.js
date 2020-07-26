// @flow
import {registerEngine} from '@playkit-js/playkit-js';
import {Flash} from './flash';

declare var __VERSION__: string;
declare var __NAME__: string;

const VERSION = __VERSION__;
const NAME = __NAME__;

export {Flash as Engine};
export {VERSION, NAME};

if (Flash.isSupported()) {
  registerEngine(Flash.id, Flash);
}

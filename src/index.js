// @flow
import {registerEngine} from '@playkit-js/playkit-js';
import {Flash} from './flash';

declare var __VERSION__: string;
declare var __NAME__: string;

export {Flash as Engine};
export {__VERSION__ as VERSION, __NAME__ as NAME};

if (Flash.isSupported()) {
  registerEngine(Flash.id, Flash);
}

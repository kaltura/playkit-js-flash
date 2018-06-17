// @flow
import {registerEngine} from 'playkit-js'
import Flash from './flash'

declare var __VERSION__: string;
declare var __NAME__: string;

export default Flash;
export {__VERSION__ as VERSION, __NAME__ as NAME};

const pluginName: string = "flash";
Flash.runCapabilities();
Flash.getCapabilities().then(((capabilites) =>{
  if (capabilites["flash"].isSupported) {
    registerEngine(Flash);
  }
}));

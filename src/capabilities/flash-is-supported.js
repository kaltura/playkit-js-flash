// @flow
import {ICapability} from 'playkit-js'

export default class FlashIsSupported implements ICapability {
  static _result: boolean;

  /***
   * Runs the test for isSupported capability.
   * @public
   * @static
   * @returns {void}
   */
  static runCapability(): void {
    let version = '0,0,0';

    try {
      version = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash')
        .GetVariable('$version')
        .replace(/\D+/g, ',')
        .match(/^,?(.+),?$/)[1];

    } catch (e) {
      try {
        if (navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
          version = (navigator.plugins['Shockwave Flash 2.0'] ||
            navigator.plugins['Shockwave Flash'])
            .description
            .replace(/\D+/g, ',')
            .match(/^,?(.+),?$/)[1];
        }
      } catch (err) {
        // ignore
      }
    }
    FlashIsSupported._result =  version.split(',')[0] >= 10;

  }

  /**
   * Gets the test result for isSupported capability.
   * @returns {Promise<CapabilityResult>} - The result object for isSupported capability.
   * @static
   * @public
   */
  static getCapability(): Promise<CapabilityResult> {
    return Promise.resolve({isSupported: FlashIsSupported._result});
  }
}

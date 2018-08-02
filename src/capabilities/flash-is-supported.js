// @flow
import {ICapability} from 'playkit-js';

class FlashIsSupported implements ICapability {
  static _result: boolean;

  /**
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
        if (window.navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
          version = (window.navigator.plugins['Shockwave Flash 2.0'] || window.navigator.plugins['Shockwave Flash']).description
            .replace(/\D+/g, ',')
            .match(/^,?(.+),?$/)[1];
        }
      } catch (err) {
        // ignore
      }
    }
    let majorVersion: number = parseInt(version.split(',')[0]);
    FlashIsSupported._result = majorVersion >= 10;
  }

  /**
   * Gets the test result for isSupported capability.
   * @returns {Promise<CapabilityResult>} - The result object for isSupported capability.
   * @static
   * @public
   */
  static getCapability(): Promise<CapabilityResult> {
    return Promise.resolve({isSupported: FlashIsSupported._result, autoplay: true, mutedAutoPlay: true});
  }
}

export {FlashIsSupported};

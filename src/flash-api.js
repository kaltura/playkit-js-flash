// @flow

export default class FlashAPI  {

  flashObject: any;

  constructor(flashObject) {
    this.flashObject = flashObject;
  }

  load(url) {
    this.flashObject.playerLoad(url);
  }

  play(offset) {
    this.flashObject.playerPlay(offset);
  }

  pause() {
    this.flashObject.playerPause();
  }

  resume() {
    this.flashObject.playerResume();
  }

  seek(offset) {
    this.flashObject.playerSeek(offset);
  }

  stop() {
    this.flashObject.playerStop();
  }

  volume(volume) {
    this.flashObject.playerVolume(volume);
  }

  setCurrentLevel(level) {
    this.flashObject.playerSetCurrentLevel(level);
  }

  setNextLevel(level) {
    this.flashObject.playerSetNextLevel(level);
  }

  setLoadLevel(level) {
    this.flashObject.playerSetLoadLevel(level);
  }

  setMaxBufferLength(len) {
    this.flashObject.playerSetmaxBufferLength(len);
  }

  getPosition() {
    return this.flashObject.getPosition();
  }

  getDuration() {
    return this.flashObject.getDuration();
  }

  getbufferLength() {
    return this.flashObject.getbufferLength();
  }

  getbackBufferLength() {
    return this.flashObject.getbackBufferLength();
  }

  getLowBufferLength() {
    return this.flashObject.getlowBufferLength();
  }

  getMinBufferLength() {
    return this.flashObject.getminBufferLength();
  }

  getMaxBufferLength() {
    return this.flashObject.getmaxBufferLength();
  }

  getLevels() {
    return this.flashObject.getLevels();
  }

  getAutoLevel() {
    return this.flashObject.getAutoLevel();
  }

  getCurrentLevel() {
    return this.flashObject.getCurrentLevel();
  }

  getNextLevel() {
    return this.flashObject.getNextLevel();
  }

  getLoadLevel() {
    return this.flashObject.getLoadLevel();
  }

  getAudioTrackList() {
    return this.flashObject.getAudioTrackList();
  }

  getStats() {
    return this.flashObject.getStats();
  }

  setAudioTrack(trackId) {
    this.flashObject.playerSetAudioTrack(trackId);
  }

  playerSetLogDebug(state) {
    this.flashObject.playerSetLogDebug(state);
  }

  getLogDebug() {
    return this.flashObject.getLogDebug();
  }

  playerSetLogDebug2(state) {
    this.flashObject.playerSetLogDebug2(state);
  }

  getLogDebug2() {
    return this.flashObject.getLogDebug2();
  }

  playerSetUseHardwareVideoDecoder(state) {
    this.flashObject.playerSetUseHardwareVideoDecoder(state);
  }

  getUseHardwareVideoDecoder() {
    return this.flashObject.getUseHardwareVideoDecoder();
  }

  playerSetflushLiveURLCache(state) {
    this.flashObject.playerSetflushLiveURLCache(state);
  }

  getflushLiveURLCache() {
    return this.flashObject.getflushLiveURLCache();
  }

  playerSetJSURLStream(state) {
    this.flashObject.playerSetJSURLStream(state);
  }

  getJSURLStream() {
    return this.flashObject.getJSURLStream();
  }

  playerCapLeveltoStage(state) {
    this.flashObject.playerCapLeveltoStage(state);
  }

  getCapLeveltoStage() {
    return this.flashObject.getCapLeveltoStage();
  }

  playerSetAutoLevelCapping(level) {
    this.flashObject.playerSetAutoLevelCapping(level);
  }

  getAutoLevelCapping() {
    return this.flashObject.getAutoLevelCapping();
  }

}

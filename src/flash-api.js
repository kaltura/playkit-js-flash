// @flow

export default class FlashAPI  {

  flashObject: any;

  constructor(flashObject: any): void {
    this.flashObject = flashObject;
  }

  load(url: string): void {
    this.flashObject.playerLoad(url);
  }

  play(offset: number): void {
    this.flashObject.playerPlay(offset);
  }

  pause(): void {
    this.flashObject.playerPause();
  }

  resume(): void {
    this.flashObject.playerResume();
  }

  seek(offset: number): void {
    this.flashObject.playerSeek(offset);
  }

  stop(): void {
    this.flashObject.playerStop();
  }

  volume(volume: number): void {
    this.flashObject.playerVolume(volume);
  }

  setCurrentLevel(level: number): void {
    this.flashObject.playerSetCurrentLevel(level);
  }

  setNextLevel(level: number): void {
    this.flashObject.playerSetNextLevel(level);
  }

  setLoadLevel(level: number): void {
    this.flashObject.playerSetLoadLevel(level);
  }

  setMaxBufferLength(len: number): void {
    this.flashObject.playerSetmaxBufferLength(len);
  }

  getPosition(): number {
    return this.flashObject.getPosition();
  }

  getDuration(): number {
    return this.flashObject.getDuration();
  }

  getbufferLength(): number {
    return this.flashObject.getbufferLength();
  }

  getbackBufferLength(): number {
    return this.flashObject.getbackBufferLength();
  }

  getLowBufferLength(): number {
    return this.flashObject.getlowBufferLength();
  }

  getMinBufferLength(): number {
    return this.flashObject.getminBufferLength();
  }

  getMaxBufferLength(): number {
    return this.flashObject.getmaxBufferLength();
  }

  getLevels(): any {
    return this.flashObject.getLevels();
  }

  getAutoLevel(): any {
    return this.flashObject.getAutoLevel();
  }

  getCurrentLevel(): number {
    return this.flashObject.getCurrentLevel();
  }

  getNextLevel(): number {
    return this.flashObject.getNextLevel();
  }

  getLoadLevel(): number {
    return this.flashObject.getLoadLevel();
  }

  getAudioTrackList(): Array<Object> {
    return this.flashObject.getAudioTrackList();
  }

  getStats(): any {
    return this.flashObject.getStats();
  }

  setAudioTrack(trackId: number): void {
    this.flashObject.playerSetAudioTrack(trackId);
  }

  playerSetLogDebug(state: boolean): void {
    this.flashObject.playerSetLogDebug(state);
  }

  getLogDebug(): any {
    return this.flashObject.getLogDebug();
  }

  playerSetLogDebug2(state: boolean): void {
    this.flashObject.playerSetLogDebug2(state);
  }

  getLogDebug2(): any {
    return this.flashObject.getLogDebug2();
  }

  playerSetUseHardwareVideoDecoder(state: boolean): void {
    this.flashObject.playerSetUseHardwareVideoDecoder(state);
  }

  getUseHardwareVideoDecoder(): boolean {
    return this.flashObject.getUseHardwareVideoDecoder();
  }

  playerSetflushLiveURLCache(state: boolean): void {
    this.flashObject.playerSetflushLiveURLCache(state);
  }

  getflushLiveURLCache(): any {
    return this.flashObject.getflushLiveURLCache();
  }

  playerSetJSURLStream(state: boolean): void {
    this.flashObject.playerSetJSURLStream(state);
  }

  getJSURLStream(): any {
    return this.flashObject.getJSURLStream();
  }

  playerCapLeveltoStage(state: boolean): void {
    this.flashObject.playerCapLeveltoStage(state);
  }

  getCapLeveltoStage(): any {
    return this.flashObject.getCapLeveltoStage();
  }

  playerSetAutoLevelCapping(level: number): void {
    this.flashObject.playerSetAutoLevelCapping(level);
  }

  getAutoLevelCapping(): number {
    return this.flashObject.getAutoLevelCapping();
  }

}

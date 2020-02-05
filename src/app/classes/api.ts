export class Api {}

export class PolMeterPar {
  id: string;
  polarity: string;
  DCOffset: string;
  threshold: string;
  CFDThreshold: string;
  timeInterval: string;
  inCh: string;
  outCh1: string;
  outCh2: string;
  beamCh: string;
  shortGate: string;
  longGate: string;
  time: string;

  constructor() {
    this.id = '';
    this.polarity = '';
    this.DCOffset = '';
    this.threshold = '';
    this.CFDThreshold = '';
    this.timeInterval = '';
    this.inCh = '';
    this.outCh1 = '';
    this.outCh2 = '';
    this.beamCh = '';
    this.shortGate = '';
    this.longGate = '';
    this.time = '';
  }
}

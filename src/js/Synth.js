import VCO from "./VCO";
import LFO from "./LFO";
import Filter from "./Filter";

export default class Synth {
  constructor() {
    this.audioContext = new AudioContext();

    this.vco1 = new VCO(this.audioContext);
    this.vco2 = new VCO(this.audioContext);
    this.lfo = new LFO(this.audioContext);
    this.filter = new Filter(this.audioContext);
    this.gain = this.audioContext.createGain();
    this.gain.gain.value = 1;

    this.lfo.connect(this.vco1.oscillator.frequency);
    this.lfo.connect(this.vco2.oscillator.frequency);
    this.vco1.connect(this.gain);
    this.vco2.connect(this.gain);
    this.gain.connect(this.filter.filter);
    this.filter.connect(this.audioContext.destination);
  }

  play(note, octave) {
    this.vco1.play(note, octave);
    this.vco2.play(note, octave);
  }

  stop() {
    this.vco1.stop();
    this.vco2.stop();
  }
}

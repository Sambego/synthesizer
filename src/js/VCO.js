import FrequencyCalculator from './FrequencyCalculator';

export default class VCO {
    constructor(audioContext, type = 'sawtooth') {
        this._detune = 0;
        this._frequency = 0;
        this._amp = 1;
        this._note = 'C';
        this._octave = 0;
        this._octaveUp = 2;

        this.oscillator = audioContext.createOscillator();
        this.oscillator.frequency.value = 1;
        this.oscillator.type = type;
        this.oscillator.start(0);

        this.gain = audioContext.createGain();
        this.gain.gain.value = this._amp;

        this.input = this.oscillator;
        this.output = this.gain;

        this.oscillator.connect(this.gain);
    }

    calculateFrequency() {
        return FrequencyCalculator.calculateFrequencyByStep(FrequencyCalculator.calculateSteps(this._note, this._octave) + this._detune + (this._octaveUp * 12));
    }

    connect(input) {
        return this.output.connect(input);
    }

    play(note = 'C', octave = 0) {
        this._note = note;
        this._octave = parseInt(octave);
        this._frequency = this.calculateFrequency();
        this.oscillator.frequency.value = this.frequency;

        this.gain.gain.value = this._amp;
    }

    stop() {
        this.gain.gain.value = 0;
    }

    destroy() {
        this.oscillator.stop();
        this.oscillator.disconnect();

        this.gain.disconnect()
    }

    get frequency() {
        return this._frequency;
    }

    set frequency(frequency) {
        this._frequency = parseFloat(frequency)
        this.oscillator.frequency.value = this._frequency;

        return this._frequency;
    }

    get detune() {
        return this._detune;
    }

    set detune(detune) {
        this._detune = parseInt(detune);
        this._frequency = this.calculateFrequency();
        this.oscillator.frequency.value = this._frequency;

        return this._detune;
    }

    get amp() {
        return this._amp;
    }

    set amp(amplitude) {
        this._amp = parseFloat(amplitude)
        this.gain.gain.value = this._amp;

        return this._amp;
    }

    get octaveUp() {
        return this._octave;
    }

    set octaveUp(octave) {
        this._octaveUp = parseInt(octave);
        this.frequency = this.calculateFrequency();
        this.oscillator.frequency.value = this._frequency;

        return this._octaveUp;
    }
};

import VCO from './VCO'

export default class LFO extends VCO {
    constructor(audioContext, type = 'sine') {
        super(audioContext, type);

        this.oscillator.type = type;
    }

    get rate() {
        return this._frequency;
    }

    set rate(rate) {
        this._frequency = parseFloat(rate);
        this.oscillator.frequency.value = this._frequency;

        return this._frequency;
    }
}

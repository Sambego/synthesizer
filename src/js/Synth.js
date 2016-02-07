export default class Synth {
    constructor() {
        this.audioContext = new AudioContext;

        this.oscillator1 = this.audioContext.createOscillator();
        this.oscillator1.frequency.value = 1;
        this.oscillator1.type = 'sawtooth';
        this.oscillator1.start();

        this.gain = this.audioContext.createGain();
        this.gain.gain.value = 0;

        this.oscillator1.connect(this.gain);
        this.gain.connect(this.audioContext.destination);
    }

    play(frequency) {
        this.oscillator1.frequency.value = frequency;

        this.gain.gain.value = 1;
    }

    stop() {
        this.gain.gain.value = 0;
    }
};

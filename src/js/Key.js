export default class Key {
    constructor(note, octave, frequency) {
        this.note = note;
        this.octave = octave;
        this.frequency = frequency;
    }

    isKey(note, octave) {
        return (this.note === note && this.octave === octave);
    }
};

export default class Key {
    constructor(note, octave) {
        this.note = note;
        this.octave = octave;
    }

    isKey(note, octave) {
        return (this.note === note && this.octave === octave);
    }
};

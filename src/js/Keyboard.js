import Key from './Key';

/**
 * The base frequency, we'll use A4 since this is a nice whole number
 * @type {Number}
 */
const _base = 440.0; // A4

/**
 * The amount of half steps a note is from A
 * @type {Array}
 */
const _steps = {
    C: -9,
    Csharp: -8,
    D: -7,
    Dsharp: -6,
    E: -5,
    F: -4,
    Fsharp: -3,
    G: -2,
    Gsharp: -1,
    A: 0,
    Asharp: 1,
    B: 2
};

/**
 * Calculate the amount of half steps between A4 and a given note anc octave
 * @param  {String} note   [The note]
 * @param  {Number} octave [The octave]
 * @return {Number}        [The number of half steps]
 */
const _calculateSteps = function(note, octave) {
    if (octave === 4) {
        return _steps[note];
    } else {
        return ((4 - octave) * -12) + _steps[note];
    }
};

/**
 * Calculate the frequency of a note
 * @param  {Number} steps [The number of half steps]
 * @return {Number}       [The calculated frequency]
 */
const _calculateFrequency = function(steps) {
    return _base * Math.pow(Math.pow(2, (1/12)), steps);
};

export default class  {
    constructor() {
        this.keys = [];
        this.keyMapping = {};
    }

    registerKey(note, octave, keyCode) {
        this.keys.push(new Key(note, octave, _calculateFrequency(_calculateSteps(note, octave))));
        this.keyMapping[keyCode] = {note: note, octave: octave}
    }

    keyDown(keyCode, callback) {
        if (this.keyMapping.hasOwnProperty(keyCode)) {
            this.keys.forEach(key => {
                if (key.note === keyMapping[keyCode].note && key.octave === keyMapping[keyCode].octave) {
                    callback(key.frequency);
                }
            });
        }
    }

    keyUp(keyCode, callback) {
        if (this.keyMapping.hasOwnProperty(keyCode)) (
            callback();
        )
    }
};

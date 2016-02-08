import Key from './Key';

export default class  {
    constructor() {
        this.keyMapping = {};
    }

    registerKey(note, octave, keyCode) {
        this.keyMapping[keyCode] = new Key(note, octave);
    }

    keyDown(keyCode, callback) {
        if (this.keyMapping.hasOwnProperty(keyCode)) {
            callback(this.keyMapping[keyCode]);
        }
    }

    keyUp(keyCode, callback) {
        if (this.keyMapping.hasOwnProperty(keyCode)) {
            callback();
        }
    }
};

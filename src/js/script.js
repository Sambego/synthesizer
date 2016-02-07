require('../scss/style.scss');

import Keyboard from './Keyboard';
import Synth from './Synth';

(function() {
    const keyboard = new Keyboard;
    const synth = new Synth;
    const keyMapping = {
        65: {note: 'C', octave: 2},
        87: {note: 'Csharp', octave: 2},
        83: {note: 'D', octave: 2},
        69: {note: 'Dsharp', octave: 2},
        68: {note: 'E', octave: 2},
        70: {note: 'F', octave: 2},
        84: {note: 'Fsharp', octave: 2},
        71: {note: 'G', octave: 2},
        89: {note: 'Gsharp', octave: 2},
        72: {note: 'A', octave: 2},
        85: {note: 'Asharp', octave: 2},
        74: {note: 'B', octave: 2},
        75: {note: 'C', octave: 3},
        79: {note: 'Csharp', octave: 3},
        76: {note: 'D', octave: 3},
        80: {note: 'Dsharp', octave: 3},
        186: {note: 'E', octave: 3},
        222: {note: 'F', octave: 3},
        221: {note: 'Fsharp', octave: 3},
        220: {note: 'G', octave: 3},
    };

    const start = function(mouse, event) {
        console.log(event, mouse)
        if (mouse || (!mouse && keyMapping.hasOwnProperty(event.keyCode))) {
            keyboard.keys.forEach(key => {
                if (mouse) {
                    if (key.note === event.target.dataset.note && key.octave === event.target.dataset.octave) {
                        event.target.classList.add('keyboard__key--active');

                        synth.play(key.frequency);
                    }
                } else {
                    if (key.note === keyMapping[event.keyCode].note && key.octave === String(keyMapping[event.keyCode].octave)) {
                        document.querySelector(`[data-note="${keyMapping[event.keyCode].note}"][data-octave="${keyMapping[event.keyCode].octave}"]`).classList.add('keyboard__key--active');

                        synth.play(key.frequency);
                    }
                }
            });
        }
    };

    const stop = function(mouse, event) {
        if (!mouse && keyMapping.hasOwnProperty(event.keyCode)) {
            document.querySelector('.keyboard__key--active').classList.remove('keyboard__key--active');
        } else {
            event.target.classList.remove('keyboard__key--active');
        }

        synth.stop();
    };

    [].forEach.call(document.querySelectorAll('.keyboard__key'), key => {
        keyboard.registerKey(key.dataset.note, key.dataset.octave);

        key.addEventListener('mousedown', start.bind(event, true));
        key.addEventListener('mouseup', stop.bind(event, true));
    });

    window.addEventListener('keydown', start.bind(event, false));
    window.addEventListener('keyup', stop.bind(event, false));
})();

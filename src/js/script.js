require('../scss/style.scss');

import Keyboard from './Keyboard';
import Synth from './Synth';

(function() {
    const keyboard = new Keyboard;
    const synth = new Synth;

    const start = function(mouse, event) {
        if (mouse) {
            if (event.target.dataset.note === event.target.dataset.note && event.target.dataset.octave === event.target.dataset.octave) {
                event.target.classList.add('keyboard__key--active');

                synth.play(event.target.dataset.note, event.target.dataset.octave);
            }
        } else {
            keyboard.keyDown(event.keyCode, (key) => {
                document.querySelector(`[data-note="${key.note}"][data-octave="${key.octave}"]`).classList.add('keyboard__key--active');

                synth.play(key.note, key.octave);
            });
        }
    };

    const stop = function(mouse, event) {
        if (mouse) {
            event.target.classList.remove('keyboard__key--active');
        } else {
            keyboard.keyUp(event.keyCode, () => {
                document.querySelector('.keyboard__key--active').classList.remove('keyboard__key--active');
            });
        }

        synth.stop();
    };

    [].forEach.call(document.querySelectorAll('.keyboard__key'), key => {
        keyboard.registerKey(key.dataset.note, key.dataset.octave, key.dataset.keyboardCode);

        key.addEventListener('mousedown', start.bind(undefined, true));
        key.addEventListener('mouseup', stop.bind(undefined, true));
    });

    window.addEventListener('keydown', start.bind(undefined, false));
    window.addEventListener('keyup', stop.bind(undefined, false));

    document.querySelector('[data-controll="vco1.detune"]').addEventListener('input', event => {
        synth.vco1.detune = event.target.value;
    });

    document.querySelector('[data-controll="vco1.amp"]').addEventListener('input', event => {
        synth.vco1.amp = event.target.value;
    });

    document.querySelector('[data-controll="vco2.detune"]').addEventListener('input', event => {
        synth.vco2.detune = event.target.value;
    });

    document.querySelector('[data-controll="vco2.amp"]').addEventListener('input', event => {
        synth.vco2.amp = event.target.value;
    });

    document.querySelector('[data-controll="lfo.rate"]').addEventListener('input', event => {
        synth.lfo.rate = event.target.value;
    });

    document.querySelector('[data-controll="lfo.amp"]').addEventListener('input', event => {
        synth.lfo.amp = event.target.value;
    });

    document.querySelector('[data-controll="vca.gain"]').addEventListener('input', event => {
        synth.gain.gain.value = parseFloat(event.target.value);
    });
})();

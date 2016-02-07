require('../scss/style.scss');

import Keyboard from './Keyboard';
import Synth from './Synth';

(function() {
    const keyboard = new Keyboard;
    const synth = new Synth;

    const start = function(mouse = false, event) {
        if (mouse) {
            if (key.note === event.target.dataset.note && key.octave === event.target.dataset.octave) {
                event.target.classList.add('keyboard__key--active');

                synth.play(key.frequency);
            }
        } else {
            keyboard.keyDown(event.keyCode, (frequency) => {
                document.querySelector(`[data-note="${keyMapping[event.keyCode].note}"][data-octave="${keyMapping[event.keyCode].octave}"]`).classList.add('keyboard__key--active');

                synth.play(frequency);
            });
        }
    };

    const stop = function(mouse = false, event) {
        if (mouse) {
            event.target.classList.remove('keyboard__key--active');
        } else (
            keyboard.keyUp(event.keyCode, () => {
                document.querySelector('.keyboard__key--active').classList.remove('keyboard__key--active');
            });
        )

        synth.stop();
    };

    [].forEach.call(document.querySelectorAll('.keyboard__key'), key => {
        keyboard.registerKey(key.dataset.note, key.dataset.octave, key.dataset.keyboardCode);

        key.addEventListener('mousedown', start.bind(event, true));
        key.addEventListener('mouseup', stop.bind(event, true));
    });

    window.addEventListener('keydown', start.bind(event));
    window.addEventListener('keyup', stop.bind(event));
})();

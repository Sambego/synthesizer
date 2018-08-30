export default class Filter {
  constructor(audioContext) {
    this.filter = audioContext.createBiquadFilter();
  }

  get frequency() {
    return this._frequency;
  }

  set frequency(rate) {
    this._frequency = parseFloat(rate);
    this.filter.frequency.value = this._frequency;

    return this._frequency;
  }

  connect(input) {
    return this.filter.connect(input);
  }
}

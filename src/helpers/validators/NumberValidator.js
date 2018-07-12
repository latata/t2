import SimpleValidator from './SimpleValidator';

class NumberValidator extends SimpleValidator {
  constructor(options = {}) {
    super(options);

    this.min = options.min || 0;
    this.max = options.max || Number.MAX_SAFE_INTEGER || (2 ** 53) - 1;
  }

  validate(value) {
    let error = super.validate(value);

    if (!error && value) {
      const intValue = parseInt(value, 10);
      if (Number.isNaN(intValue) || value < this.min || value > this.max) {
        error = `Wartość pola musi być między ${this.min}, a ${this.max}`;
      }
    }

    return error;
  }

  parse(value) {
    return value && value.replace(',', '.');
  }
}

export default NumberValidator;

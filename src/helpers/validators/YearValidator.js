import NumberValidator from './NumberValidator';

class YearValidator extends NumberValidator {
  constructor(options = {}) {
    super(options);

    this.min = options.min || 2000;
    this.max = options.max || 2100;
  }
}

export default YearValidator;

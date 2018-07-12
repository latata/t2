class SimpleValidator {
  constructor(options = {}) {
    this.required = options.required;
  }

  validate(value) {
    if (this.required && !value) {
      return 'Pole jest wymagane.';
    }

    return '';
  }
}

export default SimpleValidator;

import SimpleValidator from './SimpleValidator';

class EmailValidator extends SimpleValidator {
  constructor(options = {}) {
    super(options);
  }

  validate(value) {
    if (value && !/^[a-z0-9][a-z0-9-_.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(value)) {
      return 'Wprowadź poprany adres e-mail.';
    }

    return super.validate(value);
  }
}

export default EmailValidator;

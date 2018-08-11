import { Component } from 'react';
import h from 'react-hyperscript';
import ReactSelect from 'react-select';

class Select extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      error: undefined,
    };
  }

  componentDidMount() {
    this.validate(this.props.value);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.validate(this.props.value);
    }
  }

  onChange(data) {
    const value = data && data.value;

    this.validate(value);
    this.props.onChange({
      name: this.props.name,
      value,
    });
  }

  validate(value) {
    const { validator, name } = this.props;
    const error = validator && validator.validate(value);

    if (error !== this.state.error) {
      this.props.onValidityChange({
        name,
        error,
      });
    }
    this.setState({ error });
  }

  render() {
    const {
      options,
      value,
      name,
      required,
    } = this.props;

    return h(ReactSelect, {
      name,
      value,
      options,
      required,
      onChange: this.onChange,
    });
  }
}

export default Select;

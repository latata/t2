import React, { Component } from 'react';
import h from 'react-hyperscript';

class Input extends Component {
  static getDerivedStateFromProps({ name, id, value }) {
    return {
      name: name || id,
      value: value || '',
    };
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.inputRef = React.createRef();

    this.state = {
      touched: false,
    };
  }

  componentDidMount() {
    this.validate(this.state.value);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.validate(this.state.value);
    }
  }

  onChange(event) {
    const { value, name } = event.target;

    this.validate(value);
    this.props.onChange({
      name,
      value: this.parse(value),
    });
  }

  onBlur() {
    this.props.onTouch(true);
  }

  validate(value) {
    const { validator } = this.props;
    const error = validator && validator.validate(value);

    if (error !== this.state.error) {
      this.inputRef.current.setCustomValidity(error);
      this.props.onValidityChange({
        error,
      });
    }
    this.setState({ error });
  }

  parse(value) {
    const { validator } = this.props;

    if (validator && validator.parse) {
      return validator.parse(value);
    }

    return value;
  }

  render() {
    const { id, type = 'text' } = this.props;
    const { name, value } = this.state;

    return h('input.form-control', {
      id,
      name,
      value,
      type,
      onChange: this.onChange,
      onBlur: this.onBlur,
      ref: this.inputRef,
    });
  }
}

export default Input;

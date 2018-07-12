import {Component} from 'react';
import h from 'react-hyperscript';
import Input from './Input';

import './InputGroup.css';

class InputGroup extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onTouch = this.onTouch.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);

    this.state = {
      touched: false,
    };
  }

  onChange(data) {
    const { onChange } = this.props;
    onChange(data);
  }

  onTouch() {
    this.setState({ touched: true });
  }

  onValidityChange({ error }) {
    this.setState({
      error,
    });
    this.props.onValidityChange({
      name: this.props.name,
      error,
    });
  }

  render() {
    const {
      name,
      label,
      value,
      validator,
      submitted,
    } = this.props;
    const { error, touched } = this.state;

    return h('.form-group', [
      h('label', {
        htmlFor: name,
      }, label),
      h(Input, {
        id: name,
        value,
        validator,
        onChange: this.onChange,
        onTouch: this.onTouch,
        onValidityChange: this.onValidityChange,
      }),
      (submitted || touched) && error && h('.invalid-feedback', error),
    ]);
  }
}

export default InputGroup;

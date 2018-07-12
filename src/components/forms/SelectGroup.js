import {Component} from 'react';
import h from 'react-hyperscript';
import Select from './Select';

class SelectGroup extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);

    this.state = {
      touched: false,
    };
  }

  onChange(data) {
    this.setState({
      touched: true,
    });
    this.props.onChange(data);
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
      options,
    } = this.props;
    const { error, touched } = this.state;

    return h('.form-group', [
      h('label', {
        htmlFor: name,
      }, label),
      h(Select, {
        name,
        value,
        validator,
        options,
        onChange: this.onChange,
        onValidityChange: this.onValidityChange,
      }),
      (submitted || touched) && error && h('.invalid-feedback', error),
    ]);
  }
}

export default SelectGroup;

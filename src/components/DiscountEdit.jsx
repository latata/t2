import React, { Component } from 'react';
import Icon from './Icon';

class DiscountEdit extends Component {
  static getDerivedStateFromProps(props) {
    return {
      groupOptions: props.groupOptions,
    };
  }

  constructor(props) {
    super(props);

    this.state = {};

    this.inputChanged = this.inputChanged.bind(this);
  }

  inputChanged(event) {
    const groupOptions = this.state.groupOptions.set(event.target.name, event.target.value);
    this.setState({ groupOptions });
  }

  render() {
    const { onCancel, onSave } = this.props;
    return (
      <form onSubmit={event => onSave(this.state.groupOptions, event)}>
        <input
          className="form-control"
          name="amountDiscount"
          value={this.state.groupOptions.get('amountDiscount', 0)}
          onChange={this.inputChanged}
          style={{ width: '70px' }}
          placeholder="PLN"
        />
        <input
          className="form-control"
          name="percentDiscount"
          value={this.state.groupOptions.get('percentDiscount', 0)}
          onChange={this.inputChanged}
          style={{ width: '70px' }}
          placeholder="%"
        />
        <button type="button" className="btn btn-sm" onClick={onCancel}><Icon name="ban" /></button>
        <button type="submit" className="btn btn-sm"><Icon name="circle-check" /></button>
      </form>);
  }
}

export default DiscountEdit;

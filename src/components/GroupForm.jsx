import React, { Component } from 'react';
import get from 'lodash.get';
import GroupPricingForm from './GroupPricingForm';
import Group from '../models/Group';

class GroupForm extends Component {
  constructor(props) {
    super(props);

    this.inputChanged = this.inputChanged.bind(this);
    this.updatePricing = this.updatePricing.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      group: this.props.group || Group.create({}),
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.group !== newProps.group) {
      this.setState({ group: newProps.group });
    }
  }

  inputChanged(event) {
    this.setState({ group: this.state.group.set(event.target.name, event.target.value) });
  }

  updatePricing(pricing) {
    this.setState({ group: this.state.group.set('pricing', pricing) });
  }

  submit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.group);
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <div className="form-group">
          <label htmlFor="code">Kod grupy</label>
          <input
            name="code"
            id="code"
            className="form-control"
            value={get(this, 'state.group.code', '')}
            onChange={this.inputChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nazwa</label>
          <input
            name="name"
            id="name"
            className="form-control"
            value={get(this, 'state.group.name', '')}
            onChange={this.inputChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Rok rozpoczęcia</label>
          <input
            name="year"
            id="year"
            className="form-control"
            value={get(this, 'state.group.year', '')}
            onChange={this.inputChanged}
          />
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => {
            this.setState({ showPricing: !this.state.showPricing });
          }}
        >Pokaż cennik
        </button>
        {this.state.showPricing &&
        <GroupPricingForm pricing={this.state.group.pricing} onUpdate={this.updatePricing} />}
        <button type="submit" className="mb-4 btn btn-primary">
          Zapisz
        </button>
      </form>
    );
  }
}

export default GroupForm;
